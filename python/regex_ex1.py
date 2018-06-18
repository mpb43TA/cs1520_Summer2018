

import re

s = "a man, a planter, a plan, a canal: panama" #for questions 1-4

#1. TODO: Find man in string s start/end indices
print("-- Q1 --\n")
m = re.search('man',s)
print('{0}, start:{1} end:{2}'.format(m.group(0), m.start(0), m.end(0))) #(pattern, s)
print(s[2:5])

#2. TODO: Find all words in s
print("\n-- Q2 --\n")
print(re.findall('\w+',s))

#3. TODO: Find plan in string s and the start/end indices
print("\n-- Q3 --\n")
m = re.search(r'\b(plan)\b',s)
print(m.group(0), m.start(0), m.end(0))
m1 = re.search('plan(?=\W)',s)
print(m1.group(0), m1.start(0), m1.end(0))

#4. TODO: replace all punctuation and spaces with hyphens in s
#such that each word is separated by one hyphen
print("\n-- Q4 --\n")
print(re.sub('\W+', '-', s))

emails = ["user2015yeah@pitt.edu","somePerson19@gmail.com","another_user@yahoo.com"]
def print_regexs(strs, re_user, re_dom, re_tld):
    for s in strs:
        print("\n"+s)
        print("\tUser name:\t{0}".format(re.search(re_user, s).group(0)))
        print("\tDomain:\t{0}".format(re.search(re_dom, s).group(0)))
        print("\tTop Level:\t{0}".format(re.search(re_tld, s).group(0)))

#5. TODO retrieve the user name, domain (e.g. gmail or cs.pitt), and top level domain (e.g. edu)
#use print_regexs() method
print("\n-- Q5 --\n")
print_regexs(emails, '.+(?=@)', '(?<=@)\w+', '\w+$')

#6. TODO find all of substrings in s1-s3<#>
print("\n-- Q6 --\n")
s1 = 'hello9999 hello9999again' #find length 2 substrings (i.e. ['ll', '99', '99', 'll', '99', '99'])
s2 = "foofoo" #find length 2 substrings (i.e. ['oo', 'oo'])
s3 = "trellis llama webbing aa aa dresser swagger" #find the following substrings ['ll', 'll', 'bb', ' aa aa', 'ss', 'gg']


#7. TODO take the following string and change it to "24 of June, 9 of August, 12 of Dec"
#hint: use backreferences
print("\n-- Q7 --\n")
s = "June 24, August 9, Dec 12"

#8. TODO take the following string and extract the id and author as a dictionary
#The output should look like the following {'id': '10', 'author': 'matt'}
#hint: you can use named groups
print("\n-- Q8 --\n")

address1 = 'http://some_site.com/article/10/matt'
pattern1 = r'.+/article/(?P<id>\d+)/(?P<author>\w+)$'
print(re.match(pattern1, address1).groupdict())


#The output should look like the following {'first_name': 'carmen', 'last_name': 'sandiego'}
address2 = 'http://some_site.com/author/carmen/sandiego'
pattern2 = r'.+/author/(?P<first_name>\w+)/(?P<last_name>\w+)$'
print(re.match(pattern2, address2).groupdict())
































