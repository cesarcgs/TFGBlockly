import Solution
import filecmp

def main():
	Solution.Solution().main()

	with open('answer.txt', "r") as f:
		line1 = f.readline()
		line2 = f.readline()
		line3 = f.readline()
		line1 = line1.replace("\n", "")
		line2 = line2.replace("\n", "")
	if line1.isdigit() and line2.isdigit() and (line1 == line2) and (len(line3) == 0):
		print "[Success] Tu solucion ha superado todos los casos!"
	else:
		print "[Fail] Tu respuesta no es correcta"
	print "Tu respuesta:"
	print line1
	print line2

if __name__ == '__main__':
    main()