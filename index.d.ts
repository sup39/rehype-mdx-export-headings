export = ExportHeadings;
/** @type {import('unified').Plugin<[Partial<ExportHeadingsOptions>?], import('hast').Root>} */
declare const ExportHeadings: import('unified').Plugin<[Partial<ExportHeadingsOptions>?], import('hast').Root>;
declare namespace ExportHeadings {
    export { ExportHeadingsOptions, HeadingInfo };
}
type ExportHeadingsOptions = {
    tags: string[];
    name: string;
};
type HeadingInfo = {
    tagName: string;
    label: string;
    id: string;
};
