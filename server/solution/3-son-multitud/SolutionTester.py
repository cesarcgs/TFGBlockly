import Solution
import filecmp

def main():
    Solution.Solution().main()
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print ("[Success] Tu solucion ha superado todos los casos!")
    else:
        print ("[Fail] Tu respuesta no es correcta")
    print ("Tu respuesta:")
    with open("answer.txt", "r") as f:
        for i in range (0, 10):
            line1 = f.readline().replace("\n", "")
            print (line1)
    
if __name__ == '__main__':
    main()