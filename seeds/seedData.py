# pip install Faker
import random, os
from faker import Faker
faker = Faker()

users = 5
posts = 12
comments = 25

# USER SEED
def seedUser(numUsers):

    with open('userData.json', 'w') as f:
        f.write('[ \n')
        for _ in range(numUsers):
            f.write('{\n')
            f.write('"username": "' + faker.name() + '",\n' + 
            '"password": "' + faker.password() + '"\n')
            f.write('},\n')
        f.write('\n]')

# PROJECT SEED
def seedPost(numPosts):
    with open('postData.json', 'w') as f:
        f.write('[ \n')
        for _ in range(numPosts):
            f.write('{\n')
            f.write(
            '"title": "' + faker.company() + '",\n' + 
            '"content": "' + " ".join(faker.words(5)) + '",\n' + 
            '"creator": ' + str(int(random.random()*users)+1) + '\n')
            f.write('},\n')
        f.write('\n]')


#COMMENT SEED
def seedComment(numComments):
    with open('commentData.json', 'w') as f:
        f.write('[ \n')
        for _ in range(numComments):
            f.write('{\n')
            f.write('"content": "' + " ".join(faker.words(5)) + '",\n' +
                    '"creator": ' + str(int(random.random()*users)+1) + ',\n' +
                    '"post_id": ' + str(int(random.random()*posts)+1) + '\n')
            f.write('},\n')
        f.write('\n]')


seedUser(users)
seedPost(posts)
seedComment(comments)