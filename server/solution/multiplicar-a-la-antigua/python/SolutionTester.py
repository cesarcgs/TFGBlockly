import json
import Solution
import filecmp

def stringToIntegerList(input):
    return json.loads(input)

def stringToInt(input):
    return int(input)

def integerListToString(nums, len_of_list=None):
    if not len_of_list:
        len_of_list = len(nums)
    return json.dumps(nums[:len_of_list])

def main():
    test = open("testcase.txt", "r")
    while True:
        line = test.readline()
        if not line:
            break
        line = line.replace('\n', '')
        x = line.split(' ')
        Solution.Solution().main(int(x[0]), int(x[1]), int(x[2]))
    test.close()

    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success] Tu solucion ha superado todos los casos!"
    else:
        print "[Fail] Tu respuesta no es correcta"
    
if __name__ == '__main__':
    main()