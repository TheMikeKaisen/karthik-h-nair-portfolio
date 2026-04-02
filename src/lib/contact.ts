/**
 * Utility to handle email link clicks with fallback logic for Gmail app on mobile.
 */
export const handleEmailClick = () => {
    const email = "h.karthiknair@gmail.com";
    const subject = encodeURIComponent("Inquiry from Portfolio");
    const body = encodeURIComponent("Hi Karthik,\n\nI was checking out your 'Garden' and...");

    // 1. The Web/Desktop URL
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    // 2. The Mobile Deep Link (Specific to Gmail App)
    const gmailAppUrl = `googlegmail:///co?to=${email}&subject=${subject}&body=${body}`;

    // Detection logic
    if (typeof window === "undefined") return;
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Try to open the Gmail App
      window.location.href = gmailAppUrl;

      // Fallback: If they don't have the Gmail app, open in browser after a short delay
      setTimeout(() => {
        window.open(gmailWebUrl, "_blank");
      }, 500);
    } else {
      // Desktop: Open Gmail in a new tab
      window.open(gmailWebUrl, "_blank");
    }
};
