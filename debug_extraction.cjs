const fs = require('fs');
const FILE = './public/city.glb';

function parseGlb(buffer) {
    const magic = buffer.readUInt32LE(0);
    if (magic !== 0x46546C67) throw new Error("Not a GLB file");

    const version = buffer.readUInt32LE(4);
    const length = buffer.readUInt32LE(8);

    let offset = 12;
    // Chunk 0: JSON
    const chunkLength = buffer.readUInt32LE(offset);
    const chunkType = buffer.readUInt32LE(offset + 4);
    offset += 8;

    if (chunkType !== 0x4E4F534A) throw new Error("First chunk is not JSON");

    const jsonBuf = buffer.slice(offset, offset + chunkLength);
    const json = JSON.parse(jsonBuf.toString('utf8'));
    return json;
}

const buffer = fs.readFileSync(FILE);
const json = parseGlb(buffer);
const nodes = json.nodes;
const scenes = json.scenes;
const defaultScene = json.scene || 0;
const rootIndices = scenes[defaultScene].nodes;

// Build parent map
const parentMap = new Map();
const nodeIndexToName = new Map();

for (let i = 0; i < nodes.length; i++) {
    nodeIndexToName.set(i, nodes[i].name || "");
    if (nodes[i].children) {
        for (const child of nodes[i].children) {
            parentMap.set(child, i);
        }
    }
}

// Logic simulation
// Logic simulation
const IGNORED_NAMES = new Set(["rootnode", "sketchfab_model", "sketchfab_scene", "colladascene", "scene", "plane", "road lines"]);

const WHITELIST = [
    "casa", "house", "building", "villetta", "condominio", "skyscraper",
    "macchina", "car", "bus", "camion", "ice cream",
    "pino", "tree", "albero",
    "fence", "staccionata",
    "bench", "panchina",
    "lamp", "lanterna", "light",
    "sign", "cartello",
    "bush", "cespuglio",
    "sport", "basket", "football"
];

const isIgnored = (rawName, childCount) => {
    if (!rawName) return true;
    const name = rawName.trim().toLowerCase();

    // Explicit blacklist
    if (IGNORED_NAMES.has(name)) return true;
    if (name.endsWith(".fbx") || name.endsWith(".obj") || name.endsWith(".glb")) return true;

    // Technical heuristic
    if (childCount > 60) return true;

    // Check whitelist
    const isWhitelisted = WHITELIST.some(kw => name.includes(kw));
    if (!isWhitelisted) return true; // Ignore if not not in whitelist

    return false;
};

// Traverse and "pick"
const picked = new Map(); // uuid (simulated by index) -> name

function traverse(nodeIndex) {
    const node = nodes[nodeIndex];

    if (node.mesh !== undefined) {
        // Find pick
        let cur = nodeIndex;
        let pick = null;

        while (cur !== undefined && !rootIndices.includes(cur)) { // stop at scene root
            const name = nodes[cur].name || "";
            const childCount = nodes[cur].children ? nodes[cur].children.length : 0;

            if (name.trim().length > 0 && !isIgnored(name, childCount)) {
                pick = cur;
                // We keep going up to find the *highest* valid parent? 
                // My Game.ts logic says: "if ... pick = cur" inside the loop. 
                // So yes, it overwrites pick with the higher valid one.
            }

            cur = parentMap.get(cur);
        }

        // Also check if rootIndices themselves are candidates (Game.ts stops at scene)
        if (cur !== undefined && rootIndices.includes(cur)) {
            const name = nodes[cur].name || "";
            const childCount = nodes[cur].children ? nodes[cur].children.length : 0;
            if (name.trim().length > 0 && !isIgnored(name, childCount)) {
                pick = cur;
            }
        }

        if (pick !== null) {
            picked.set(pick, nodes[pick].name);
        }
    }

    if (node.children) {
        for (const child of node.children) traverse(child);
    }
}

for (const root of rootIndices) {
    traverse(root);
}

console.log("--- Extracted Objects Detailed ---");
for (const [id, name] of picked.entries()) {
    if (name.toLowerCase().includes("casa") || name.toLowerCase().includes("house")) {
        const children = nodes[id].children || [];
        const childNames = children.map(c => nodes[c].name).join(", ");
        console.log(`[${id}] ${name} (Children: ${children.length}) -> [${childNames}]`);
    } else {
        // Print others briefly
        const children = nodes[id].children ? nodes[id].children.length : 0;
        // console.log(`[${id}] ${name} (Children: ${children})`);
    }
}
