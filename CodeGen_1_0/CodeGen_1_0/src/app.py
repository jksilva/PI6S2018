from models.codeg import Code

code1 = Code(author="silvajk",title="Hello world",blocks=[0])
code1.author = "silvajk"
code1.blocks.append(0)
code1.blocks.append(1)


print(code1.blocks)
