const fs = require('fs');

const path = './src/components/products-page/ProductsUseCases.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add use client and useState
content = content.replace(
  'import { gilroyExtraBold, gilroyMedium, interRegular } from "../hero/fonts";',
  `"use client";\nimport { useState } from "react";\nimport { gilroyExtraBold, gilroyMedium, interRegular } from "../hero/fonts";`
);

// Add the image mapping
content = content.replace(
  'export function ProductsUseCases() {',
  `const USE_CASE_IMAGES: Record<string, string> = {
  "HEARABLES": "/applications/app-hearables.png",
  "SMART HOMES": "/applications/app-smart-home.png",
  "INDUSTRIAL": "/applications/app-industrial.png",
  "AUTOMOTIVE": "/applications/app-automotive.png",
  "MEDICAL": "/applications/app-medical.png",
  "AGRICULTURE": "/applications/app-agriculture.png",
};

export function ProductsUseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = USECASE_TABS[activeIdx];
  const activeImage = USE_CASE_IMAGES[activeTab.label] || "/products/use-case-image.png";

  const nextTab = () => setActiveIdx((i) => (i + 1) % USECASE_TABS.length);
  const prevTab = () => setActiveIdx((i) => (i - 1 + USECASE_TABS.length) % USECASE_TABS.length);`
);

// Pass state to desktop
content = content.replace(
  '<ProductsUseCasesDesktop />',
  '<ProductsUseCasesDesktop activeTab={activeTab} activeImage={activeImage} onNext={nextTab} onPrev={prevTab} onSelect={setActiveIdx} activeIdx={activeIdx} />'
);

// Pass state to mobile
content = content.replace(
  '<ProductsUseCasesMobile />',
  '<ProductsUseCasesMobile activeTab={activeTab} activeImage={activeImage} onSelect={setActiveIdx} activeIdx={activeIdx} />'
);

// Update Desktop signature
content = content.replace(
  'function ProductsUseCasesDesktop() {',
  `function ProductsUseCasesDesktop({ activeTab, activeImage, onNext, onPrev, onSelect, activeIdx }: any) {`
);

// Update Mobile signature
content = content.replace(
  'function ProductsUseCasesMobile() {',
  `function ProductsUseCasesMobile({ activeTab, activeImage, onSelect, activeIdx }: any) {`
);

// Fix Desktop image and label
content = content.replace(
  /Hearables\s*<\/h3>/,
  `{activeTab.label}\n      </h3>`
);
content = content.replace(
  'src="/products/use-case-image.png"',
  'src={activeImage}'
);

// Pass props to TabRuler
content = content.replace(
  '<TabRuler />',
  '<TabRuler onNext={onNext} onPrev={onPrev} onSelect={onSelect} activeIdx={activeIdx} />'
);

// Update TabRuler signature
content = content.replace(
  'function TabRuler() {',
  `function TabRuler({ onNext, onPrev, onSelect, activeIdx }: any) {`
);

// Connect arrows and fix right arrow flip
content = content.replace(
  '<ArrowButton src="/products/tab-arrow-left.svg" nodeId="2901:2035" />',
  '<ArrowButton src="/products/tab-arrow-left.svg" nodeId="2901:2035" onClick={onPrev} />'
);
content = content.replace(
  '<ArrowButton src="/products/tab-arrow-right.svg" nodeId="2901:2089" flip />',
  '<ArrowButton src="/products/tab-arrow-right.svg" nodeId="2901:2089" onClick={onNext} />'
);

// Make TabButton use state
content = content.replace(
  /<TabButton tab=\{tab\} \/>/g,
  '<TabButton tab={tab} active={activeIdx === i} onClick={() => onSelect(i)} />'
);

// Update TabButton signature
content = content.replace(
  'function TabButton({ tab }: { tab: (typeof USECASE_TABS)[number] }) {',
  `function TabButton({ tab, active, onClick }: any) {`
);

content = content.replace(
  'const active = !!tab.active;',
  ''
);

content = content.replace(
  'data-node-id={active ? "2901:2047" : undefined}',
  'data-node-id={active ? "2901:2047" : undefined}\n      onClick={onClick}'
);

// Update ArrowButton signature and add onClick
content = content.replace(
  'function ArrowButton({',
  `function ArrowButton({\n  onClick,`
);
content = content.replace(
  'flip?: boolean;\n}) {',
  `flip?: boolean;\n  onClick?: () => void;\n}) {`
);
content = content.replace(
  'data-name="Menu"',
  'data-name="Menu"\n      onClick={onClick}'
);

// Update Mobile stuff
// Mobile title
content = content.replace(
  /Hearables\s*<\/h3>/,
  `{activeTab.label}\n        </h3>`
);

// Mobile active state for tabs
content = content.replace(
  /tab\.active\n\s*\?\s*"bg-\[#f0f0f0\] px-\[12px\] py-\[8px\] text-black"\n\s*:\s*"px-\[8px\] py-\[8px\] text-\[#666\]"/,
  `idx === activeIdx\n                ? "bg-[#f0f0f0] px-[12px] py-[8px] text-black"\n                : "px-[8px] py-[8px] text-[#666]"`
);

// Mobile map needs index
content = content.replace(
  'USECASE_TABS.map((tab) => (',
  'USECASE_TABS.map((tab, idx) => ('
);

// Add onClick to mobile span
content = content.replace(
  'key={tab.label}',
  'key={tab.label}\n            onClick={() => onSelect(idx)}\n            role="button"\n            tabIndex={0}'
);

// Add missing image replacements
content = content.replace(
  'src="/products/use-case-image.png"',
  'src={activeImage}'
);

fs.writeFileSync(path, content);
console.log("Done");
