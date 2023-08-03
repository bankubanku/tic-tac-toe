window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d");

    canvas.width = 420;
    canvas.height = 420;
    var grid_size = canvas.width;
    var grid_field_size = grid_size/3;   
    
    drawGrid(ctx, grid_field_size)
})


function drawGrid(ctx, grid_field_size) {
    /**
     * This function draws a grid
     */

    ctx.moveTo(grid_field_size, 0);
    ctx.lineTo(grid_field_size,420);
    ctx.stroke();

    ctx.moveTo(grid_field_size*2, 0);
    ctx.lineTo(grid_field_size*2,420);
    ctx.stroke();

    ctx.moveTo(0, grid_field_size);
    ctx.lineTo(420,grid_field_size);
    ctx.stroke();

    ctx.moveTo(0, grid_field_size*2);
    ctx.lineTo(420,grid_field_size*2);
    ctx.stroke();
}


