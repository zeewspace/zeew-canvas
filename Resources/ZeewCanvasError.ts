export default class ZeewCanvasError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ZeewCanvasError';
    }
}