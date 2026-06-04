import { CompanyCardCorners } from "./company-corners";

type CompanyArticleCornersProps = {
  cornerBottom: number;
};

export function CompanyArticleCorners({
  cornerBottom,
}: CompanyArticleCornersProps) {
  return <CompanyCardCorners cornerBottom={cornerBottom} />;
}
