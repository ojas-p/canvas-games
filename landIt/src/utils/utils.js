/**
 * 
 * @param {Context} ctx - canvas context
 * @param {Image} img - target image
 * @param {Number} sx - source x-position
 * @param {Number} sy - source y-position
 * @param {Number} sw - source width
 * @param {Number} sh - source height
 * @param {Number} dx - x-position on canvas
 * @param {Number} dy - y-position on canvas
 * @param {Number} dw - width on canvas
 * @param {Number} dh - height on canvas
 */
export const drawSprite = (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) => {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}