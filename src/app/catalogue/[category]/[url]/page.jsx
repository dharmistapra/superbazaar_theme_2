import { getCataloguedetail, getCatalogueStitching, getRelatedCatalogue } from "@/services/catalogueService";
import { getThemeModules } from "@/theme/themeConfig";

const CatalogueDetailPage = async ({ params }) => {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const { category, url } = await params;
    const { Catalogue } = getThemeModules(currentTheme);
    const [data, stitching] = await Promise.all([
        getCataloguedetail(url),
        getCatalogueStitching(url),
    ]);
    return (
        <Catalogue
            category={category}
            CatalogueDetailData={data.data || {}}
            stitching={stitching.data} />
    )
}

export default CatalogueDetailPage