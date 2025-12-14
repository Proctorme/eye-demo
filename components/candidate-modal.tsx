"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import type { CandidateData } from "@/app/page";

interface CandidateModalProps {
  onSubmit: (data: CandidateData) => Promise<void> | void;
}

export function CandidateModal({ onSubmit }: CandidateModalProps) {
  const [formData, setFormData] = useState({
    apiKey: "",
    candidateId: "",
    assessmentId: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
    enableFacialRecognition: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.apiKey.trim()) newErrors.apiKey = "API Key is required";
    // if (!formData.candidateId.trim())
    //   newErrors.candidateId = "Candidate ID is required";
    // if (!formData.assessmentId.trim())
    //   newErrors.assessmentId = "Assessment ID is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    // if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required"
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        console.log("Form Data Submitted:", formData);
        await onSubmit(formData);
      }
    } finally {
      // any cleanup if needed
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md border-2">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Test Assessment
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Enter your details to begin
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Widget API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={formData.apiKey}
                onChange={handleChange}
                className={errors.apiKey ? "border-red-500" : ""}
              />
              {errors.apiKey && (
                <p className="text-sm text-red-500">{errors.apiKey}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateId">Candidate ID</Label>
                <Input
                  id="candidateId"
                  name="candidateId"
                  placeholder="Auto-generated if left blank"
                  value={formData.candidateId}
                  onChange={handleChange}
                  className={errors.candidateId ? "border-red-500" : ""}
                />
                {errors.candidateId && (
                  <p className="text-xs text-red-500">{errors.candidateId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessmentId">Assessment ID</Label>
                <Input
                  id="assessmentId"
                  name="assessmentId"
                  placeholder="Auto-generated if left blank"
                  value={formData.assessmentId}
                  onChange={handleChange}
                  className={errors.assessmentId ? "border-red-500" : ""}
                />
                {errors.assessmentId && (
                  <p className="text-xs text-red-500">{errors.assessmentId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Candidate Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className={errors.imageUrl ? "border-red-500" : ""}
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-500">{errors.imageUrl}</p>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                id="facialRecognition"
                name="enableFacialRecognition"
                checked={formData.enableFacialRecognition}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    enableFacialRecognition: checked === true,
                  }))
                }
              />
              <Label
                htmlFor="facialRecognition"
                className="font-normal cursor-pointer"
              >
                Enable Facial Recognition
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-semibold mt-6"
            >
              Start Quiz
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
