type Props = {
    page: number;
    pageCount: number;
};

const rangePageVisible = ({ page, pageCount }: Props): number[] => {
    const visible = 5;
    let startPage = Math.max(1, page - Math.floor(visible / 2));
    const endPage = Math.min(pageCount, startPage + visible - 1);

    if (endPage - startPage + 1 < visible) {
        startPage = Math.max(1, endPage - visible + 1);
    }

    const pages: number[] = [];

    for (let p = startPage; p <= endPage; p++) {
        pages.push(p);
    }

    return pages;
};

export default rangePageVisible;