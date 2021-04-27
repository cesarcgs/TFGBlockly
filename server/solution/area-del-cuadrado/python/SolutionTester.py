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
    Solution.Solution().main()
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success] Tu solucion ha superado todos los casos!"
    else:
        print "[Fail] Tu respuesta no es correcta"
    

if __name__ == '__main__':
    main()