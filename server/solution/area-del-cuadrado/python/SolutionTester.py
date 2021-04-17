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
        print(line)
        Solution.Solution().main(4)

    test.close()

    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success]Your solution passed all test cases!"
    else:
        print "[Fail]"

if __name__ == '__main__':
    main()