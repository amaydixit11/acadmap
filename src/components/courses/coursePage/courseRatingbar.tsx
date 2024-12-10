import { Progress } from "@/components/ui/progress";

interface CourseRatingBarProps {
  label: string;
  value: number;
}

export function CourseRatingBar({ label, value }: CourseRatingBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value.toFixed(1)}/5.0</span>
      </div>
      <Progress value={value * 20} className="h-2" />
    </div>
  );
}