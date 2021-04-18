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
        Solution.Solution().main(int(line))


    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success] Tu solucion ha superado todos los casos!"
    else:
        print "[Fail] Tu respuesta no es correcta"
    
    test.close()

if __name__ == '__main__':
    main()