import React from "react";
import { gilroyMedium, interRegular, interBold } from "@/components/hero/fonts";

export function TermsConditions({ data }: { data?: any }) {
  const content = data?.terms_conditions_content || "";

  return (
    <div className="relative mx-auto flex w-full max-w-[800px] flex-col px-[20px] pb-0 pt-[100px] md:pt-[120px]">
      <div 
        className={`${interRegular.className} ck-content flex flex-col gap-[20px] text-[16px] leading-[26px] text-[#f0f0f0] opacity-85 [&>h1]:text-[36px] [&>h1]:leading-[44px] [&>h1]:font-medium [&>h1]:text-white [&>h1]:md:text-[56px] [&>h1]:md:leading-[64px] [&>h1]:mb-[20px] [&>h2]:text-[28px] [&>h2]:leading-[36px] [&>h2]:text-white [&>h2]:mt-[20px] [&>ul]:list-disc [&>ul]:ml-[20px] [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-[10px]`} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}
