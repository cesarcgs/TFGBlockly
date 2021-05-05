import Solution
import filecmp

def main():
    Solution.Solution().main()
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success] Tu solucion ha superado todos los casos!"
    else:
        print "[Fail] Tu respuesta no es correcta"
    
if __name__ == '__main__':
    main()