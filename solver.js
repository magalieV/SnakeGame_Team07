

class Base {
    tile = 40;
    board = twoDimensionArray(40, 40);
    visited = twoDimensionArray(40, 40);
    reached_end = false;

    move_count = 0;
    nodes_left_in_layer = 1;
    nodes_in_next_layer = 0;

    dr = [-1, 1, 0, 0];
    dc = [0, 0, 1, -1];

    constructor() {
        for (var i = 0; i < this.tile; i++) {
            for (var j = 0; j < this.tile; j++) {
                this.visited[i][j] = false;
                this.board[i][j] = 0;
            }
        }
        this.tile = 40;
        this.reached_end = false;
    }

}


function twoDimensionArray(m, n) {
    let arr = new Array(m); // create an empty array of length n
    for (var i = 0; i < m; i++) {
        arr[i] = new Array(n); // make each element an array
    }
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            arr[i][j] = false;
        }
    }
    return arr;
}

function getShortestPath(sr, sc, dr, dc, obstacle) {
    const base = new Base();
    const rq = [];
    const cq = [];
    const dq = [];

    rq.push(sr);
    cq.push(sc);
    base.visited[sr][sc] = true;
    for (var i = 0; i < obstacle.length; i++) {
        base.board[obstacle[i].x][obstacle[i].y] = 3;
    }

    while (rq.length > 0) {
        r = rq.shift();
        c = cq.shift();


        if (r === dr && c === dc) {
            base.reached_end = true;
            break;
        }
        for (var i = 0; i < 4; i++) {

            rr = r + base.dr[i];
            cc = c + base.dc[i];


            if (rr < 0 || cc < 0) continue;
            if (rr >= base.tile || cc >= base.tile) continue;
            if (base.visited[rr][cc]) continue;
            if (base.board[rr][cc] === 3) continue;



            rq.push(rr);
            cq.push(cc);
            base.visited[rr][cc] = true;
            console.log(rr + ", " + cc);
            base.nodes_in_next_layer++;


        }
        base.nodes_left_in_layer--;
        if (base.nodes_left_in_layer == 0) {
            base.nodes_left_in_layer = base.nodes_in_next_layer;
            base.nodes_in_next_layer = 0;
            base.move_count++;
        }
    }
    if (base.reached_end) {
        var i = dr, j = dc;
        while (i !== sr && j !== sc) {
            var row, col;
            for (var k = 0; k < 4; k++) {

                row = i + base.dr[k];
                col = j + base.dc[k];

                if (base.visited[row][col]) {
                    dq.push[k];
                    i = row;
                    j = col;
                    break;
                }
            }

        }
        console.log(dq);
        return base.move_count;
    }
    return { x: 1, y: 0 };
}

export function getGreedyDirection(sr, sc, dr, dc, obs, cur) {
    var base = {
        tile: 40,
        board: twoDimensionArray(40, 40),
        visited: twoDimensionArray(40, 40),

        dr: [-1, 1, 0, 0],
        dc: [0, 0, 1, -1],
    }
    var board = base.board;

    var pos = [];
    var result;

    for (var i = 0; i < obs.length; i++) {
        board[obs[i].x][obs[i].y] = 3;
    }
    for (var i = 0; i < 4; i++) {
        var rr = sr + base.dr[i];
        var cc = sc + base.dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= base.tile || cc >= base.tile) continue;
        if (board[rr][cc] === 3) continue;

        pos.push({ x: rr, y: cc });
    }

    if (pos.length === 0) return cur;
    else {
        var length = 100;
        for (var i = 0; i < pos.length; i++) {
            var temp = Math.abs(pos[i].x, dr) + Math.abs(pos[i].y, dc);
            if (length > temp) {
                length = temp;
                result = { x: sc - pos[0].y, y: pos[0].x - sr };
            }
        }
        return result;
    }

}

console.log(getGreedyDirection(1, 1, 3, 3, [{ x: 2, y: 2 }], { x: 1, y: 0 }));

