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
    with open('testcase.txt', "r") as f:
        content = f.read()
        lines = f.readlines()
    i = 0
    Solution.Solution().main()
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Success]Your solution passed all test cases!"
    else:
        print "[Fail]" + content

if __name__ == '__main__':
    main()