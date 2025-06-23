"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Sparkles, Search } from "lucide-react";
import { DisplayText } from "@/components/global/display-text";

export function EasySearch() {
  const router = useRouter();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [jobSearchQuery, setJobSearchQuery] = useState("");

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      setIsUploadingCV(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploadingCV(false);
      }, 2000);
    }
  };

  const handleCVSearch = () => {
    // Redirect to jobs page with CV-based search
    router.push("/dashboard/jobs?type=cv");
  };

  const handleAISearch = () => {
    // Redirect to jobs page with AI search query
    const searchParams = new URLSearchParams();
    searchParams.set("type", "ai");
    searchParams.set("query", jobSearchQuery);
    router.push(`/dashboard/jobs?${searchParams.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <DisplayText className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5 text-primary" />
            Smart Job Search
          </DisplayText>
        </CardTitle>
        <CardDescription>
          Upload your CV for personalized recommendations OR describe what
          you&apos;re looking for
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Responsive Grid Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 gap-y-6">
          {/* CV Upload Section */}
          <div className="space-y-4 h-full">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Upload Your CV</Label>
            </div>

            <div className="space-y-3 flex flex-col justify-between ">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCVUpload}
                disabled={isUploadingCV}
                className="w-full cursor-pointer bg-background hover:bg-background/90 transition-colors"
              />

              {cvFile && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-md border border-green-200">
                  <FileText className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800 truncate flex-1">
                    {cvFile.name}
                  </span>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {isUploadingCV ? "Processing..." : "Ready"}
                  </Badge>
                </div>
              )}

              <Button
                onClick={handleCVSearch}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!cvFile || isUploadingCV}
              >
                {isUploadingCV ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                    Analyzing CV...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Find Jobs Based on CV
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Horizontal Separator for Mobile - Positioned absolutely */}
          <div className="relative lg:hidden z-10">
            <Separator className="w-20" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-2 text-xs text-muted-foreground">
              OR
            </div>
          </div>

          {/* Vertical Separator for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10">
            <Separator orientation="vertical" className="h-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-2 text-xs text-muted-foreground">
              OR
            </div>
          </div>

          {/* AI Search Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">
                Describe Your Ideal Job
              </Label>
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder="e.g., 'Frontend developer role at a tech startup, remote work, React experience, $80k+ salary, growth opportunities...'"
                value={jobSearchQuery}
                onChange={(e) => setJobSearchQuery(e.target.value)}
                className="min-h-[120px] lg:min-h-[100px] resize-none w-full"
              />

              <Button
                onClick={handleAISearch}
                disabled={!jobSearchQuery.trim()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Find Jobs Based on AI Search
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
