import { MAPS } from "../../public/KantoGameData/maps/constants/mapsizeData.ts";

const bytesCache = new Map<string, Uint8Array>();
const imageCache = new Map<string, HTMLImageElement>();



const loadBytes = async (url: string): Promise<Uint8Array> => {

    const cached = bytesCache.get(url);

    if (cached) return cached;

    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);

    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    bytesCache.set(url, bytes);

    return bytes;
};

// const loadImage = async (src: string): Promise<HTMLImageElement> => {
//     const cached = imageCache.get(src);
//     if (cached) return cached;
//
//     const img = new Image();
//
//     await new Promise<void>((resolve, reject) => {
//         img.onload = () => resolve();
//         img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//         img.src = src;
//     });
//
//     await img.decode();
//
//     imageCache.set(src, img);
//     return img;
// };

const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const cached = imageCache.get(src);
    if (cached) return cached;

    const img = new Image();
    img.src = src;
    await img.decode();
    imageCache.set(src, img);
    return img;
};

const drawBlock = (
    ctx: CanvasRenderingContext2D,
    tilesetImage: HTMLImageElement,
    blocksetBytes: Uint8Array,
    blockIndex: number,
    dx: number,
    dy: number
) => {
    const tileSize = 8;
    const blockTileWidth = 4;
    const blockTileHeight = 4;
    const bytesPerBlock = blockTileWidth * blockTileHeight;

    const tilesPerRow = Math.floor(tilesetImage.width / tileSize);
    const blockOffset = blockIndex * bytesPerBlock;

    for (let y = 0; y < blockTileHeight; y++) {
        for (let x = 0; x < blockTileWidth; x++) {
            const byteIndex = blockOffset + y * blockTileWidth + x;
            const tileIndex = blocksetBytes[byteIndex];

            const sx = (tileIndex % tilesPerRow) * tileSize;
            const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
// Arguments 1:     tilesetImage          — the source .png spritesheet
//
// Arguments 2–5:  sx, sy, 8, 8          — SOURCE rectangle
// "From the .png, grab the 8×8 region starting at (sx, sy)"
//
// Arguments 6–9:  dx + x*8, dy + y*8, 8, 8  — DESTINATION rectangle
// "Paste it onto the canvas at this position, also 8×8"

            ctx.drawImage(
                tilesetImage,
                sx,
                sy,
                tileSize,
                tileSize,
                dx + x * tileSize,
                dy + y * tileSize,
                tileSize,
                tileSize
            );
        }
    }
};

const drawMap = (
    ctx: CanvasRenderingContext2D,
    tilesetImage: HTMLImageElement,
    blocksetBytes: Uint8Array,
    mapBytes: Uint8Array,
    mapWidthInBlocks: number,
    mapHeightInBlocks: number
) => {
    const blockSize = 32;

    for (let by = 0; by < mapHeightInBlocks; by++) {
        for (let bx = 0; bx < mapWidthInBlocks; bx++) {
            const mapIndex = by * mapWidthInBlocks + bx;
            const blockIndex = mapBytes[mapIndex];

            drawBlock(ctx, tilesetImage, blocksetBytes, blockIndex, bx * blockSize, by * blockSize);
        }
    }
};

export const getMapDropdownOptions = () => {

    return Object.entries(MAPS)
        .filter(([, v]) => v.width > 0 && v.height > 0)
        .map(([key, v]) => ({ label: v.name, value: key }))
        .sort((a, b) => a.label.localeCompare(b.label));
};


export const renderMapToCanvas = async (
    canvas: HTMLCanvasElement,
    mapKey: string,
) => {
    const mapInfo = MAPS[mapKey];
    if (!mapInfo) {
        throw new Error(`Unknown map key: "${mapKey}". Check mapsizeData.ts.`);
    }

    const { name, tileset, width: mapWidthInBlocks, height: mapHeightInBlocks } = mapInfo;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D canvas context.");

    // Load assets in parallel
    const [tilesetImage, blocksetBytes, mapBytes] = await Promise.all([
        loadImage(`/KantoGameData/TileSets/${tileset}.png`),
        loadBytes(`/KantoGameData/TileSets/${tileset}.bst`),
        loadBytes(`/KantoGameData/maps/${name}.blk`),
    ]);


    canvas.width = mapWidthInBlocks * 32;
    canvas.height = mapHeightInBlocks * 32;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx, tilesetImage, blocksetBytes, mapBytes, mapWidthInBlocks, mapHeightInBlocks);
};