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
    # passall = True
    # """ while i < len(lines) :
    #     line = lines[i]
    #     s = line.replace("\n","")
    #     if (s == "null") :
    #         s = None
    #     #print s
    #     line = lines[i+1]
    #     #print line
    #     expected = line.replace("\n","")
    #     Solution.Solution().main()
    #     testresult =  open('testresult.txt', "r")
    #     answer =  open('answer.txt', "r")
    #     # comparamos archivos linea a linea
    #     iguales = filecmp.cmp(testresult, answer, shallow = false)


    #     #print "expected:" + expected
    #     #print "ret:" + ret
    #     if (expected == '""' and ret == "") :
    #         i += 2
    #         continue

    #     if (expected != ret) :
    #         if (s is None) :
    #             strnums = 'null'
    #         else:
    #             strnums = s
    #         print "[Fail]" + strnums + ";" + ret + ";" + expected
    #         passall = False
    #         break

    #     i = i + 2 """
    Solution.Solution().main()
    # testresult =  open('testresult.txt', "r")
    # answer =  open('answer.txt', "r")
    if filecmp.cmp("answer.txt", "testresult.txt"):
        print "[Sucess]Your solution passed all test cases!"
    else:
        print "[Fail]" + content

if __name__ == '__main__':
    main()