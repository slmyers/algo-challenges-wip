class DisjointSet {
    constructor(size) {
        this.rootArray = Array.from({length: size }).map((_, i) => i)
    }

    // returns root node of input
    find(x) {
        let curr = x
        let next = this.rootArray[x]
        while (next !== curr) {
            curr = next
            next = this.rootArray[next]
        }
        return curr
    }

    union(x, y) {
        this.rootArray[y] = x;
    }
}

class QuickFind extends DisjointSet {
    find(x) {
        return this.rootArray[x]
    }
    
    union(x, y) {
        let rootX = this.find(x)
        let rootY = this.find(y)

        if (rootX !== rootY) {
            for (let i = 0; i < this.rootArray.length; i++) {
                if (this.rootArray[i] === rootY) {
                    this.rootArray[i] = rootX
                }
            }
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}

class QuickUnion extends DisjointSet {
    union(x, y) {
        const rootX = this.find(x)
        const rootY = this.find(y)
        if (rootX !== rootY) {
            this.rootArray[rootY] = rootX
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}

class RankUnion extends QuickUnion {
    constructor(size) {
        super(size)
        this.rank = Array.from({ length: size }).map(() => 1)
    }

    union(x, y) {
        const rootX = this.find(x)
        const rootY = this.find(y)
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.rootArray[rootY] = rootX
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.rootArray[rootX] = rootY
            } else {
                this.rootArray[rootY] = rootX
                this.rank[rootX] += 1
            }
        }
    }
}

class PathCompression extends QuickUnion {
    find(x) {
        if (x === this.rootArray[x]) {
            return x;
        }
        return this.rootArray[x] = this.find(this.rootArray[x])
    }

    union(x, y) {
        const rootX = this.rootArray[x]
        const rootY = this.rootArray[y]
        if (rootX !== rootY) {
            this.rootArray[rootY] = rootX
        }
    }
}

class OptimizedDisjointSet {
    constructor(n) {
        this.root = Array.from({ length: n }).map((_, i) => i)
        this.rank = Array.from({ length: n }).map(() => 1)
    }

    find(x) {
        if (x === this.root[x]) {
            return x
        }
        return this.root[x] = this.find(this.root[x])
    }

    union(x, y) {
        const rootX = this.find(x)
        const rootY = this.find(y)
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.root[rootY] = rootX
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.root[rootX] = rootY
            } else {
                this.root[rootY] = rootX
                this.rank[rootX] += 1
            }
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}

module.exports = {
    QuickFind,
    QuickUnion,
    RankUnion,
    DisjointSet,
    PathCompression,
    OptimizedDisjointSet,
};