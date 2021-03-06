import { Source, UniversalLoader, DocumentPointerSingle, SchemaPointerSingle, SingleFileOptions } from '@graphql-toolkit/common';
export interface GraphQLFileLoaderOptions extends SingleFileOptions {
    fs?: typeof import('fs');
    path?: typeof import('path');
}
export declare class GraphQLFileLoader implements UniversalLoader<GraphQLFileLoaderOptions> {
    loaderId(): string;
    canLoad(pointer: SchemaPointerSingle | DocumentPointerSingle, options: GraphQLFileLoaderOptions): Promise<boolean>;
    canLoadSync(pointer: SchemaPointerSingle | DocumentPointerSingle, options: GraphQLFileLoaderOptions): boolean;
    load(pointer: SchemaPointerSingle | DocumentPointerSingle, options: GraphQLFileLoaderOptions): Promise<Source>;
    loadSync(pointer: SchemaPointerSingle | DocumentPointerSingle, options: GraphQLFileLoaderOptions): Source;
}
