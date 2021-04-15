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

	with open('answer.txt', "r") as f:
		line1 = f.readline()
		line2 = f.readline()
		line3 = f.readline()
		line1 = line1.replace("\n", "")
		line2 = line2.replace("\n", "")
		if line1.isdigit() and line2.isdigit() and (line1 == line2) and (len(line3) == 0):	
			print "[Success]Your solution passed all test cases!"
		else:
			print "[Fail]"
    # passall = True
	#if len(lines) == 3 		
	#	while i < len(lines) :
	#		lines
	#	content = f.readline()
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
    # testresult =  open('testresult.txt', "r")
    # answer =  open('answer.txt', "r")
    #if filecmp.cmp("answer.txt", "testresult.txt"):
    #    print "[Success]Your solution passed all test cases!"
    #else:
    #    print "[Fail]" + content

if __name__ == '__main__':
    main()