
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DSASolutionModal({
  open,
  onOpenChange,
  title,
  solutionCode,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  solutionCode: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            Solution: {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3">
          <pre className="bg-muted rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto whitespace-pre code-highlight">
            <code>
              {solutionCode}
            </code>
          </pre>
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
