import React from "react";
import { gilroyMedium, interRegular, interBold } from "@/components/hero/fonts";

export function TermsConditions({ data }: { data?: any }) {
  let content = data?.terms_conditions_content || "";
  
  // 1. Strip any inline styles and classes that get pasted from the rich text editor
  content = content.replace(/\s*(style|class)=["'][^"']*["']/gi, "");
  
  // 2. Automatically link email addresses (if they aren't already linked)
  content = content.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi, (match, email, offset, str) => {
    const precedingText = str.substring(Math.max(0, offset - 10), offset);
    if (precedingText.includes('mailto:') || precedingText.includes('href="') || precedingText.includes("href='")) {
      return match;
    }
    return `<a href="mailto:${email}">${email}</a>`;
  });

  return (
    <div className="relative mx-auto flex w-full max-w-[800px] flex-col px-[20px] pb-0 pt-[100px] md:pt-[120px]">
      <div 
        className={`${interRegular.className} flex flex-col gap-[20px] text-[16px] leading-[26px] text-[#f0f0f0] [&_p]:opacity-85 [&_h1]:text-[36px] [&_h1]:leading-[44px] [&_h1]:font-medium [&_h1]:text-white [&_h1]:md:text-[56px] [&_h1]:md:leading-[64px] [&_h1]:mb-[20px] [&_h2]:text-[28px] [&_h2]:leading-[36px] [&_h2]:text-white [&_h2]:mt-[20px] [&_h3]:text-[22px] [&_h3]:leading-[30px] [&_h3]:text-white [&_h3]:mt-[16px] [&_h4]:text-[18px] [&_h4]:leading-[26px] [&_h4]:text-white [&_ul]:list-disc [&_ul]:ml-[20px] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-[10px] [&_ul]:opacity-85 [&_strong]:font-bold [&_strong]:text-white [&_a]:text-[#4A90E2] [&_a]:underline`} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}
