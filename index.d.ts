export = ExportHeadings;
/** @type {import('unified').Plugin<[Partial<ExportHeadingsOptions>?], import('hast').Root>} */
declare const ExportHeadings: import('unified').Plugin<[Partial<ExportHeadingsOptions>?], import('hast').Root>;
declare namespace ExportHeadings {
    export { ExportHeadingsOptions };
}
type ExportHeadingsOptions = {
    tags: string[];
    name: string;
};
