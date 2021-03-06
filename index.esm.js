import { isValidPath, parseGraphQLSDL } from '@graphql-toolkit/common';

const FILE_EXTENSIONS = ['.gql', '.gqls', '.graphql', '.graphqls'];
class GraphQLFileLoader {
    loaderId() {
        return 'graphql-file';
    }
    async canLoad(pointer, options) {
        return this.canLoadSync(pointer, options);
    }
    canLoadSync(pointer, options) {
        if (isValidPath(pointer) && options.path && options.fs) {
            const { resolve, isAbsolute } = options.path;
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || process.cwd(), pointer);
                const { existsSync } = options.fs;
                if (existsSync(normalizedFilePath)) {
                    return true;
                }
            }
        }
        return false;
    }
    async load(pointer, options) {
        return this.loadSync(pointer, options);
    }
    loadSync(pointer, options) {
        const { resolve, isAbsolute } = options.path;
        const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || process.cwd(), pointer);
        const { readFileSync } = options.fs;
        const rawSDL = readFileSync(normalizedFilePath, 'utf-8').trim();
        return parseGraphQLSDL(pointer, rawSDL, options);
    }
}

export { GraphQLFileLoader };
