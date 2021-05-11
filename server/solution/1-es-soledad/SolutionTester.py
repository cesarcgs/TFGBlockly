import Solution
import filecmp

def main():
    Solution.Solution().main()
    f = open("answer.txt", 'r')
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print ("[Success]Tu solucion ha superado todos los casos de prueba!")
        print ("Tu respuesta:\n"+ f.readline())
    else:
        print ("[Fail]Tu respuesta no es correcta")
        print ("Tu respuesta:\n"+ f.readline())

if __name__ == '__main__':
    main()