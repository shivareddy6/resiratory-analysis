class DSU:
    def __init__(self, v):
        self.parent = [i for i in range(v+1)]
        self.size = [1 for i in range(v+1)]
    
    def findPar(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.findPar(self.parent[node])
        return self.parent[node]

    def isSameComp(self, node1, node2):
        return self.findPar(node1) == self.findPar(node2)

    def merge(self, node1, node2):
        if self.isSameComp(node1, node2):
            return False
        par1 = self.findPar(node1)
        par2 = self.findPar(node2)

        if self.size[par1] >= self.size[par2]:
            self.size[par1] += self.size[par2]
            self.parent[par2] = self.parent[par1]
        else:
            self.size[par2] += self.size[par1]
            self.parent[par1] = self.parent[par2]
        return True

    def getLargestCompSize(self):
        return max(self.size)
        


d = DSU(5)
d.merge(1, 2)
d.merge(0, 3)
d.merge(3, 4)
for i in range(5):
    print(d.findPar(i))
print(d.getLargestCompSize())