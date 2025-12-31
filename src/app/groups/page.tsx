'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyGroups, useGroupMembers, useGroupMessages } from '@/hooks/useStudyGroups';
import { useGroupResources, useStudySessions, useGroupAnnouncements, useGroupInvite } from '@/hooks/useGroupFeatures';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Users, Plus, UserPlus, BookOpen, Loader2, MessageCircle, Send, LogOut,
  Crown, Shield, User, Search, ArrowLeft, Clock, Share2, Link as LinkIcon,
  Calendar, MapPin, Video, FileText, Pin, Trash2, ExternalLink, Copy, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Invite Dialog
function InviteDialog({ groupId }: { groupId: string }) {
  const { inviteCode, inviteUrl, isLoading, generateInviteCode } = useGroupInvite(groupId);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (inviteUrl) {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-1" />Invite</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Group</DialogTitle>
          <DialogDescription>Share this link to invite others</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {inviteCode ? (
            <>
              <div className="flex gap-2">
                <Input value={inviteUrl || ''} readOnly className="font-mono text-sm" />
                <Button onClick={handleCopy} variant="outline">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500">Anyone with this link can join</p>
            </>
          ) : (
            <Button onClick={generateInviteCode} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LinkIcon className="w-4 h-4 mr-2" />}
              Generate Invite Link
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add Resource Dialog
function AddResourceDialog({ onAdd }: { onAdd: (t: string, u: string, d?: string) => Promise<boolean> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) return;
    setIsSubmitting(true);
    const success = await onAdd(title.trim(), url.trim(), description.trim() || undefined);
    setIsSubmitting(false);
    if (success) { setTitle(''); setUrl(''); setDescription(''); setIsOpen(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" />Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Share a Resource</DialogTitle></DialogHeader>
        <div className="space-y-4 mt-4">
          <div><label className="text-sm font-medium block mb-1">Title *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lecture Notes" /></div>
          <div><label className="text-sm font-medium block mb-1">URL *</label><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." /></div>
          <div><label className="text-sm font-medium block mb-1">Description</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></div>
          <Button onClick={handleSubmit} disabled={isSubmitting || !title.trim() || !url.trim()} className="w-full">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}Share Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Share Existing Resource Dialog
function ShareExistingResourceDialog({ onAdd, courseCode }: { onAdd: (t: string, u: string, d?: string) => Promise<boolean>; courseCode?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSharing, setIsSharing] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load course resources when dialog opens
  useEffect(() => {
    if (isOpen && courseCode && searchResults.length === 0 && !hasSearched) {
      loadCourseResources();
    }
  }, [isOpen, courseCode]);

  const loadCourseResources = async () => {
    if (!courseCode) return;
    setIsSearching(true);
    
    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      
      const { data } = await supabase
        .from('resources')
        .select('resourceId, title, url, course_code, category')
        .eq('course_code', courseCode)
        .limit(20);
      
      setSearchResults(data || []);
    } catch (err) {
      console.error('Failed to load course resources:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      
      const query = searchQuery.trim();
      
      // Try to search by title first
      const { data, error } = await supabase
        .from('resources')
        .select('resourceId, title, url, course_code, category')
        .ilike('title', `%${query}%`)
        .limit(10);
      
      if (error) {
        console.error('Title search error:', error);
        // Try course_code search as fallback
        const { data: courseData } = await supabase
          .from('resources')
          .select('resourceId, title, url, course_code, category')
          .ilike('course_code', `%${query}%`)
          .limit(10);
        setSearchResults(courseData || []);
      } else if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        // No results by title, try course_code
        const { data: courseData } = await supabase
          .from('resources')
          .select('resourceId, title, url, course_code, category')
          .ilike('course_code', `%${query}%`)
          .limit(10);
        setSearchResults(courseData || []);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleShare = async (resource: any) => {
    setIsSharing(resource.resourceId);
    const url = resource.url || `/resources/${resource.resourceId}`;
    const success = await onAdd(resource.title, url, `${resource.course_code} - ${resource.category}`);
    setIsSharing(null);
    if (success) {
      setIsOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><BookOpen className="w-4 h-4 mr-1" />Browse</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Existing Resource</DialogTitle>
          <DialogDescription>Search for resources already on Acadmap</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by title or course code..." 
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map(res => (
                  <div key={res.resourceId} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{res.title}</p>
                      <p className="text-xs text-gray-500">{res.course_code} • {res.category}</p>
                    </div>
                    <Button size="sm" onClick={() => handleShare(res)} disabled={isSharing === res.resourceId}>
                      {isSharing === res.resourceId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No resources found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Search for resources to share</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


// Schedule Session Dialog
function ScheduleSessionDialog({ onSchedule }: { onSchedule: (t: string, d: Date, dur: number, desc?: string, loc?: string, link?: string) => Promise<boolean> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !date || !time) return;
    const scheduledAt = new Date(`${date}T${time}`);
    setIsSubmitting(true);
    const success = await onSchedule(title.trim(), scheduledAt, parseInt(duration), undefined, location.trim() || undefined, meetingLink.trim() || undefined);
    setIsSubmitting(false);
    if (success) { setTitle(''); setDate(''); setTime(''); setDuration('60'); setLocation(''); setMeetingLink(''); setIsOpen(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Calendar className="w-4 h-4 mr-1" />Schedule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Schedule Study Session</DialogTitle></DialogHeader>
        <div className="space-y-4 mt-4">
          <div><label className="text-sm font-medium block mb-1">Title *</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Midterm Review" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium block mb-1">Date *</label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div><label className="text-sm font-medium block mb-1">Time *</label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          </div>
          <div><label className="text-sm font-medium block mb-1">Duration (min)</label><Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" step="15" /></div>
          <div><label className="text-sm font-medium block mb-1">Location</label><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Library Room 203" /></div>
          <div><label className="text-sm font-medium block mb-1">Meeting Link</label><Input value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="https://meet.google.com/..." /></div>
          <Button onClick={handleSubmit} disabled={isSubmitting || !title.trim() || !date || !time} className="w-full">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4 mr-2" />}Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Group Detail View - 3-Column Layout
function GroupDetailView({ group, onClose, onLeave, currentUserId }: { group: any; onClose: () => void; onLeave: () => Promise<boolean>; currentUserId: string | null; }) {
  const { members, isLoading: membersLoading } = useGroupMembers(group.id);
  const { messages, isLoading: messagesLoading, sendMessage } = useGroupMessages(group.id);
  const { resources, addResource, deleteResource } = useGroupResources(group.id);
  const { sessions, createSession, deleteSession } = useStudySessions(group.id);
  const { announcements } = useGroupAnnouncements(group.id);
  
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    await sendMessage(newMessage.trim());
    setNewMessage('');
    setIsSending(false);
  };

  const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatSessionDate = (dateString: string) => new Date(dateString).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <div className="h-14 border-b bg-white dark:bg-gray-900 flex items-center px-4 gap-3">
        <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 dark:text-white truncate">{group.name}</h2>
        </div>
        {group.course_code && <Badge variant="outline"><BookOpen className="w-3 h-3 mr-1" />{group.course_code}</Badge>}
        <InviteDialog groupId={group.id} />
        <Button variant="ghost" size="sm" onClick={onLeave} className="text-red-600 hover:text-red-700 hover:bg-red-50"><LogOut className="w-4 h-4" /></Button>
      </div>

      {/* 3-Column Layout */}
      <div className="h-[calc(100vh-56px)] flex">
        {/* Left Sidebar - Members & Sessions */}
        <div className="w-64 border-r bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
          {/* Group Info */}
          <div className="p-4 border-b">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{group.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Users className="w-3 h-3" />{members.length} members
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="p-3 border-b">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">Sessions</h4>
              <ScheduleSessionDialog onSchedule={createSession} />
            </div>
            {sessions.length === 0 ? (
              <p className="text-xs text-gray-400 py-2">No upcoming sessions</p>
            ) : (
              <div className="space-y-2">
                {sessions.slice(0, 3).map(session => (
                  <div key={session.id} className="p-2 rounded bg-gray-50 dark:bg-gray-800 text-xs">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{session.title}</p>
                    <p className="text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />{formatSessionDate(session.scheduled_at)}
                    </p>
                    {session.meeting_link && (
                      <a href={session.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center gap-1 mt-1">
                        <Video className="w-3 h-3" />Join
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Members List */}
          <div className="flex-1 overflow-y-auto p-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Members</h4>
            {membersLoading ? (
              <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />)}</div>
            ) : (
              <div className="space-y-1">
                {members.map(member => (
                  <Link key={member.user_id} href={`/profile/${member.user_id}`} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.user_avatar || undefined} />
                      <AvatarFallback className="text-[10px]">{member.user_name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{member.user_name}</span>
                    {member.role === 'owner' && <Crown className="w-3 h-3 text-amber-500" />}
                    {member.role === 'admin' && <Shield className="w-3 h-3 text-blue-500" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Chat */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
          {/* Pinned Announcement */}
          {announcements.length > 0 && (
            <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 flex items-center gap-2">
              <Pin className="w-4 h-4 text-amber-600" />
              <p className="text-sm text-amber-800 dark:text-amber-200 flex-1 truncate">{announcements[0].content}</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messagesLoading ? (
              <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">No messages yet</p>
                <p className="text-xs">Start the conversation!</p>
              </div>
            ) : (
              messages.map(msg => {
                const isOwn = msg.user_id === currentUserId;
                return (
                  <div key={msg.id} className={cn("flex gap-2 max-w-[80%]", isOwn ? "ml-auto flex-row-reverse" : "")}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.user_avatar || undefined} />
                      <AvatarFallback className="text-xs">{msg.user_name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={cn("flex items-center gap-2 mb-0.5", isOwn && "flex-row-reverse")}>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{isOwn ? 'You' : msg.user_name}</span>
                        <span className="text-xs text-gray-400">{formatTime(msg.created_at)}</span>
                      </div>
                      <div className={cn(
                        "px-3 py-2 rounded-lg text-sm",
                        isOwn ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              placeholder="Type a message..." 
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} 
              className="flex-1" 
            />
            <Button onClick={handleSend} disabled={isSending || !newMessage.trim()}>
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Right Sidebar - Resources */}
        <div className="w-72 border-l bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
          <div className="p-3 border-b">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Shared Resources</h4>
            <div className="flex flex-wrap gap-1">
              <ShareExistingResourceDialog onAdd={addResource} courseCode={group.course_code} />
              <AddResourceDialog onAdd={addResource} />
              <Link href="/upload">
                <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" />Upload</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {resources.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No resources shared yet</p>
                <p className="text-xs mt-1">Browse existing or add a link</p>
              </div>
            ) : (
              <div className="space-y-2">
                {resources.map(res => (
                  <div key={res.id} className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sm text-gray-900 dark:text-white hover:text-blue-600 flex items-center gap-1">
                      <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{res.title}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                    {res.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{res.description}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">by {res.user_name}</span>
                      {res.user_id === currentUserId && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => deleteResource(res.id)}>
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page
export default function StudyGroupsPage() {
  const { groups, myGroups, isLoading, currentUserId, createGroup, joinGroup, leaveGroup, isMember } = useStudyGroups();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');

  const handleCreate = async () => {
    if (!newName.trim() || !newDescription.trim()) return;
    setIsSubmitting(true);
    const groupId = await createGroup(newName.trim(), newDescription.trim(), newCourseCode.trim() || undefined);
    setIsSubmitting(false);
    if (groupId) { setNewName(''); setNewDescription(''); setNewCourseCode(''); setIsDialogOpen(false); }
  };

  const handleJoin = async (groupId: string) => { setActionId(groupId); await joinGroup(groupId); setActionId(null); };
  const handleLeave = async (groupId: string) => { setActionId(groupId); const s = await leaveGroup(groupId); setActionId(null); if (s && selectedGroup?.id === groupId) setSelectedGroup(null); return s; };

  const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase()) || g.course_code?.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayedGroups = activeTab === 'my' ? myGroups : filteredGroups;

  if (selectedGroup) return <GroupDetailView group={selectedGroup} onClose={() => setSelectedGroup(null)} onLeave={() => handleLeave(selectedGroup.id)} currentUserId={currentUserId} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-900 sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" />
                  Study Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button 
                  variant={activeTab === 'discover' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('discover')}
                >
                  <Search className="w-4 h-4 mr-2" />Discover
                </Button>
                <Button 
                  variant={activeTab === 'my' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('my')}
                >
                  <Users className="w-4 h-4 mr-2" />My Groups
                  <Badge variant="outline" className="ml-auto">{myGroups.length}</Badge>
                </Button>
              </CardContent>
              <div className="p-4 pt-0">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full"><Plus className="w-4 h-4 mr-2" />Create Group</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader><DialogTitle>Create Study Group</DialogTitle><DialogDescription>Start a new group for your course</DialogDescription></DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div><label className="text-sm font-medium block mb-1">Name *</label><Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="CS101 Study Squad" /></div>
                      <div><label className="text-sm font-medium block mb-1">Description *</label><Textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={3} className="resize-none" placeholder="What's your group about?" /></div>
                      <div><label className="text-sm font-medium block mb-1">Course Code</label><Input value={newCourseCode} onChange={(e) => setNewCourseCode(e.target.value.toUpperCase())} placeholder="CS101" /></div>
                      <Button onClick={handleCreate} disabled={isSubmitting || !newName.trim() || !newDescription.trim()} className="w-full">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}Create
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeTab === 'my' ? 'My Groups' : 'Discover Groups'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {activeTab === 'my' ? 'Groups you have joined' : 'Find study partners for your courses'}
              </p>
            </div>

            {/* Search */}
            {activeTab === 'discover' && (
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search groups..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-10 bg-white dark:bg-gray-900" 
                />
              </div>
            )}

            {/* Groups List */}
            {isLoading ? (
              <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />)}</div>
            ) : displayedGroups.length === 0 ? (
              <Card className="bg-white dark:bg-gray-900 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="font-medium text-gray-900 dark:text-white">{activeTab === 'my' ? "You haven't joined any groups" : "No groups found"}</p>
                  <p className="text-sm text-gray-500 mt-1">{activeTab === 'my' ? "Join a group to get started" : "Be the first to create one"}</p>
                  <Button size="sm" className="mt-4" onClick={() => activeTab === 'my' ? setActiveTab('discover') : setIsDialogOpen(true)}>
                    {activeTab === 'my' ? 'Discover Groups' : <><Plus className="w-4 h-4 mr-2" />Create Group</>}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {displayedGroups.map((group, idx) => {
                  const memberStatus = isMember(group.id);
                  const isActioning = actionId === group.id;
                  return (
                    <motion.div key={group.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                      <Card 
                        className={cn(
                          "bg-white dark:bg-gray-900 hover:shadow-md transition-all cursor-pointer",
                          memberStatus && "border-l-4 border-l-emerald-500"
                        )}
                        onClick={() => memberStatus && setSelectedGroup(group)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{group.member_count}</span>
                                    {group.course_code && (
                                      <Badge variant="outline" className="text-xs"><BookOpen className="w-3 h-3 mr-1" />{group.course_code}</Badge>
                                    )}
                                  </p>
                                </div>
                                {memberStatus ? (
                                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0">
                                    <MessageCircle className="w-3 h-3 mr-1" />Open
                                  </Badge>
                                ) : (
                                  <Button size="sm" onClick={(e) => { e.stopPropagation(); handleJoin(group.id); }} disabled={isActioning}>
                                    {isActioning ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UserPlus className="w-4 h-4 mr-1" />Join</>}
                                  </Button>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{group.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar - Stats & Quick Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Stats */}
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Groups</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{groups.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your Groups</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{myGroups.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Your Groups Quick Access */}
            {myGroups.length > 0 && (
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {myGroups.slice(0, 5).map(group => (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroup(group)}
                      className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{group.name}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>• Use invite links to bring friends</p>
                <p>• Share resources in the sidebar</p>
                <p>• Schedule sessions for meetups</p>
                <p>• Pin important announcements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
