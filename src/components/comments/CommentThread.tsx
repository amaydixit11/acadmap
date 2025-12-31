'use client';

import { useState } from 'react';
import { ResourceComment } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MessageSquare, Reply, Trash2, Send, Loader2 } from 'lucide-react';

interface CommentItemProps {
  comment: ResourceComment;
  onReply: (parentId: string, content: string) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
  currentUserId?: string;
  depth?: number;
}

function CommentItem({ comment, onReply, onDelete, currentUserId, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    const success = await onReply(comment.id, replyContent.trim());
    setIsSubmitting(false);
    
    if (success) {
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const canDelete = currentUserId === comment.user_id;
  const maxDepth = 3;

  return (
    <div className={cn(
      "border-l-2 pl-4",
      depth === 0 ? "border-gray-200 dark:border-gray-700" : "border-gray-100 dark:border-gray-800",
      depth > 0 && "ml-4 mt-3"
    )}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.user_avatar || undefined} />
          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            {comment.user_name?.charAt(0)?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {comment.user_name || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="h-7 px-2 text-xs"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
            {canDelete && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(comment.id)}
                className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
          
          {isReplying && (
            <div className="mt-3 space-y-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                rows={2}
                className="text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={isSubmitting || !replyContent.trim()}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3 mr-1" />
                  )}
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              currentUserId={currentUserId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentThreadProps {
  comments: ResourceComment[];
  onAddComment: (content: string, parentId?: string) => Promise<boolean>;
  onDeleteComment?: (id: string) => Promise<boolean>;
  currentUserId?: string;
  isLoading?: boolean;
  className?: string;
}

export function CommentThread({
  comments,
  onAddComment,
  onDeleteComment,
  currentUserId,
  isLoading = false,
  className,
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    const success = await onAddComment(newComment.trim());
    setIsSubmitting(false);
    
    if (success) {
      setNewComment('');
    }
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* New comment form */}
      <div className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or ask a question..."
          rows={3}
          className="resize-none"
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <MessageSquare className="w-4 h-4 mr-2" />
          )}
          Post Comment
        </Button>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={onAddComment}
              onDelete={onDeleteComment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
