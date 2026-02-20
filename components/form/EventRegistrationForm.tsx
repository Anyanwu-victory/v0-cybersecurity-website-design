"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle?: string;
  eventPrice?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function EventRegistrationForm({
  eventId,
  eventTitle,
  eventPrice,
  onSuccess,
  onClose,
}: EventRegistrationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    profession: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Phone number is required");
      return false;
    }
    if (!formData.profession) {
      setErrorMessage("Please select a profession");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📤 Sending registration data:", {
        eventId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        profession: formData.profession,
      });

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          profession: formData.profession,
        }),
      });

      // Log response status
      console.log("📥 Response status:", response.status);

      const data = await response.json();
      console.log("📥 Response data:", data);

      if (!response.ok) {
        // Show specific error message from API
        const errorMsg = data.error || data.details || "Registration failed. Please try again.";
        throw new Error(errorMsg);
      }

      // Success! Show message briefly
      setSuccessMessage("Registration successful! Redirecting...");

      // Check if event is paid or free
      const isPaid = eventPrice && !eventPrice.toLowerCase().includes("free");

      // Wait a moment to show success message
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isPaid && eventPrice) {
        // Extract amount from price string (e.g., "$1,499" -> "1499")
        const priceAmount = eventPrice.replace(/[^0-9]/g, "");

        // Redirect to Paystack checkout
        const checkoutUrl = new URL(
          "/events/register/checkout",
          window.location.origin,
        );
        checkoutUrl.searchParams.set("email", formData.email);
        checkoutUrl.searchParams.set("amount", priceAmount);
        checkoutUrl.searchParams.set("eventId", eventId);
        checkoutUrl.searchParams.set("eventTitle", eventTitle || "");
        checkoutUrl.searchParams.set("fullName", formData.fullName);

        console.log("💳 Redirecting to checkout:", checkoutUrl.toString());
        router.push(checkoutUrl.toString());
      } else {
        // Free event - redirect to success page
        const successUrl = new URL(
          "/events/register/success",
          window.location.origin,
        );
        successUrl.searchParams.set("email", formData.email);
        successUrl.searchParams.set("eventTitle", eventTitle || "");

        console.log("✅ Redirecting to success page:", successUrl.toString());
        router.push(successUrl.toString());
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        profession: "",
      });

      // Call success callback if provided
      onSuccess?.();

    } catch (error) {
      console.error("❌ Registration error:", error);
      
      const errorMsg = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred. Please try again.";
      
      setErrorMessage(errorMsg);
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl border border-white/10 bg-card p-8">
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose?.()}
          className="p-2 rounded-md hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <h2 className="mb-2 text-2xl font-bold">Register for Event</h2>
      {eventTitle && (
        <p className="mb-6 text-sm text-muted-foreground">{eventTitle}</p>
      )}

      {eventPrice && (
        <div className="mb-6 inline-block px-3 py-1 rounded-full bg-[#E11D2E]/10 border border-[#E11D2E]/30">
          <p className="text-sm font-semibold text-[#E11D2E]">{eventPrice}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          <p className="text-sm text-green-400">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#E11D2E]/30 bg-[#E11D2E]/10 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E11D2E]" />
          <p className="text-sm text-[#E11D2E]">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="John Doe"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="+234 XX XXX XXXX"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company{" "}
            <span className="text-muted-foreground text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Acme Corp"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </div>

        {/* Profession */}
        <div>
          <label
            htmlFor="profession"
            className="block text-sm font-medium mb-2"
          >
            Profession <span className="text-[#E11D2E]">*</span>
          </label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          >
            <option value="">Select Profession</option>
            <option value="Student">Student</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Engineer">Engineer</option>
            <option value="Security Professional">Security Professional</option>
            <option value="IT Manager">IT Manager</option>
            <option value="Developer">Developer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !!successMessage}
          className="w-full mt-6 rounded-lg bg-[#E11D2E] px-4 py-3 font-semibold text-white transition-all hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register Now"
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By registering, you agree to receive event-related emails.
        </p>
      </form>
    </div>
  );
}