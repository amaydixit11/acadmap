'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResourceRequests } from '@/hooks/useResourceRequests';
import { useRequestComments } from '@/hooks/useRequestComments';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowUp, 
  Plus, 
  MessageSquarePlus, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Search,
  TrendingUp,
  Clock,
  FileQuestion,
  BookOpen,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Send,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const statusConfig = {
  open: {
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: MessageSquarePlus,
    label: 'Open',
  },
  fulfilled: {
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: CheckCircle2,
    label: 'Fulfilled',
  },
  closed: {
    color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    icon: XCircle,
    label: 'Closed',
  },
};

type SortOption = 'popular' | 'recent' | 'oldest';
type StatusFilter = 'all' | 'open' | 'fulfilled' | 'closed';

// Comments Section Component
function RequestCommentsSection({ requestId }: { requestId: string }) {
  const { comments, isLoading, addComment } = useRequestComments(requestId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    const success = await addComment(newComment.trim());
    setIsSubmitting(false);
    if (success) setNewComment('');
  };

  return (
    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Comments ({comments.length})
      </h4>
      
      {/* Comment Input */}
      <div className="flex gap-2 mb-4">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
        />
        <Button 
          size="sm" 
          onClick={handleSubmit}
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="h-6 w-6 flex-shrink-0">
                <AvatarImage src={comment.user_avatar || undefined} />
                <AvatarFallback className="text-[10px] bg-gray-200 dark:bg-gray-700">
                  {comment.user_name?.charAt(0)?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-gray-900 dark:text-white">{comment.user_name}</span>
                  <span className="text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mark as Fulfilled Dialog
function MarkFulfilledDialog({ 
  requestId, 
  onFulfill 
}: { 
  requestId: string; 
  onFulfill: (url: string, title: string) => Promise<boolean>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim() || !title.trim()) return;
    setIsSubmitting(true);
    const success = await onFulfill(url.trim(), title.trim());
    setIsSubmitting(false);
    if (success) {
      setUrl('');
      setTitle('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/20">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Mark Fulfilled
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as Fulfilled</DialogTitle>
          <DialogDescription>
            Link to the resource that fulfilled this request.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Resource Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CS101 Final Exam 2023 Solutions"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Resource URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !url.trim() || !title.trim()}
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Confirm Fulfilled
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function RequestsPage() {
  const { requests, isLoading, currentUserId, createRequest, upvoteRequest, markAsFulfilled, reopenRequest } = useResourceRequests();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [votingId, setVotingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.course_code?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
    }

    return result;
  }, [requests, statusFilter, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    total: requests.length,
    open: requests.filter(r => r.status === 'open').length,
    fulfilled: requests.filter(r => r.status === 'fulfilled').length,
  }), [requests]);

  const handleSubmit = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    
    setIsSubmitting(true);
    const success = await createRequest(
      newTitle.trim(),
      newDescription.trim(),
      newCourseCode.trim() || undefined
    );
    setIsSubmitting(false);
    
    if (success) {
      setNewTitle('');
      setNewDescription('');
      setNewCourseCode('');
      setIsDialogOpen(false);
    }
  };

  const handleUpvote = async (requestId: string) => {
    setVotingId(requestId);
    await upvoteRequest(requestId);
    setVotingId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FileQuestion className="w-5 h-5 text-white" />
                </div>
                Resource Requests
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Can't find what you need? Request it here.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request a Resource</DialogTitle>
                  <DialogDescription>
                    Describe what you need and the community will help.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">What do you need? *</label>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g., CS101 Final Exam 2023"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Details *</label>
                    <Textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Any specific details..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Course Code (optional)</label>
                    <Input
                      value={newCourseCode}
                      onChange={(e) => setNewCourseCode(e.target.value.toUpperCase())}
                      placeholder="e.g., CS101"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !newTitle.trim() || !newDescription.trim()}
                    className="w-full"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">{stats.open}</p>
              <p className="text-xs text-gray-500">Open</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.fulfilled}</p>
              <p className="text-xs text-gray-500">Fulfilled</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-[130px] bg-white dark:bg-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular"><TrendingUp className="w-4 h-4 inline mr-2" />Popular</SelectItem>
              <SelectItem value="recent"><Clock className="w-4 h-4 inline mr-2" />Recent</SelectItem>
              <SelectItem value="oldest"><Clock className="w-4 h-4 inline mr-2" />Oldest</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Status Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Requests List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white dark:bg-gray-900 animate-pulse">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card className="bg-white dark:bg-gray-900 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileQuestion className="w-12 h-12 text-gray-400 mb-4" />
              <p className="font-medium text-gray-900 dark:text-white">No requests found</p>
              <Button size="sm" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />Create Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {filteredRequests.map((request, idx) => {
                const status = statusConfig[request.status];
                const StatusIcon = status.icon;
                const isVoting = votingId === request.id;
                const isExpanded = expandedId === request.id;
                const isOwner = currentUserId === request.user_id;
                
                return (
                  <motion.div
                    key={request.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <Card className="bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          {/* Upvote */}
                          <div className={cn(
                            "flex flex-col items-center justify-center w-14 py-4 border-r border-gray-100 dark:border-gray-800",
                            request.has_upvoted && "bg-blue-50 dark:bg-blue-900/20"
                          )}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpvote(request.id)}
                              disabled={isVoting}
                              className={cn("h-9 w-9 p-0 rounded-full", request.has_upvoted && "text-blue-600")}
                            >
                              {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className={cn("w-4 h-4", request.has_upvoted && "fill-current")} />}
                            </Button>
                            <span className={cn("text-sm font-semibold", request.has_upvoted ? "text-blue-600" : "text-gray-600 dark:text-gray-400")}>
                              {request.upvotes}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 p-4 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{request.title}</h3>
                              <Badge className={cn("flex-shrink-0 text-xs", status.color)}>
                                <StatusIcon className="w-3 h-3 mr-1" />{status.label}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                              {request.description}
                            </p>

                            {/* Fulfilled Resource Link */}
                            {request.status === 'fulfilled' && request.fulfilled_resource_url && (
                              <a
                                href={request.fulfilled_resource_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {request.fulfilled_resource_title || 'View Resource'}
                              </a>
                            )}
                            
                            <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={request.user_avatar || undefined} />
                                  <AvatarFallback className="text-[10px] bg-gray-200 dark:bg-gray-700">
                                    {request.user_name?.charAt(0)?.toUpperCase() || '?'}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{request.user_name}</span>
                              </div>
                              
                              {request.course_code && (
                                <Link href={`/courses/${request.course_code}`}>
                                  <Badge variant="outline" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <BookOpen className="w-3 h-3 mr-1" />{request.course_code}
                                  </Badge>
                                </Link>
                              )}
                              
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />{formatDate(request.created_at)}
                              </span>
                            </div>

                            {/* Actions Row */}
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedId(isExpanded ? null : request.id)}
                                className="text-gray-600"
                              >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Comments
                                {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                              </Button>

                              {/* Owner Actions */}
                              {isOwner && request.status === 'open' && (
                                <MarkFulfilledDialog
                                  requestId={request.id}
                                  onFulfill={(url, title) => markAsFulfilled(request.id, url, title)}
                                />
                              )}

                              {isOwner && request.status === 'fulfilled' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => reopenRequest(request.id)}
                                  className="text-gray-600"
                                >
                                  <RotateCcw className="w-3 h-3 mr-1" />
                                  Reopen
                                </Button>
                              )}
                            </div>

                            {/* Comments Section */}
                            {isExpanded && (
                              <RequestCommentsSection requestId={request.id} />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
