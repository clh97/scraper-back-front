from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
from pprint import pprint
import collections
import json
import re
import sqlite3
from sqlite3 import Error
from http.server import HTTPServer

# http server
host_name = 'localhost'
host_port = 3000

# web scraper
genre = 'axe'
base_url = 'https://www.cifraclub.com.br'
all_data_url = base_url + '/mais-acessadas/' + genre + '/'

musics = []

class Music:
    def __init__(self, _link, _artist, _name):
        self.link = _link
        self.artist = _artist
        self.name = _name

class ArtData:
    def __init__(self, _htmlData):
        self.htmlData = _htmlData
        self.parsedHtml = BeautifulSoup(_htmlData, 'html.parser')
        self.topList = self.parsedHtml.select('#js-sng_list')
        self.createListFromDom(self.topList)

    def createListFromDom(self, rawHtmlData):
        for li in rawHtmlData[0].select('li'):
            link = base_url + li.a['href']
            artist = li.span.span.text
            musicName = li.span.strong.text

            music = Music(link, artist, musicName)
            musics.append(music)

def filterGenreName(name):
    if name == '':
        return 'todos'
    else:
        return name.replace('-', '_')

def isResponseOk(resp):
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200 
            and content_type is not None 
            and content_type.find('html') > -1)

def logError(e):
    print('error: ' + e + '\n\n')

def main():
    data = getData(all_data_url)
    artData = ArtData(data)

def getData(url):
    try:
        print('obtaining data from: ' + url)
        with closing(get(url, stream=True)) as resp:
            if isResponseOk(resp):
                return resp.content
            else:
                return None
    except:
        logError('get data error...')


def createDbConnection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        print("sqlite version: " + sqlite3.version)
        return conn
    except Error as e:
        print(e)

def initDb(connection):    
    command = 'CREATE TABLE IF NOT EXISTS ' + filterGenreName(genre) + ' ( id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL, artist text NOT NULL, link text NOT NULL, chords text NOT NULL);'

    if connection is not None:
        sqlCommand(connection, command)
        return connection
    else:
        print('database error!')
        exit()


def sqlCommand(conn, sqlCmd):
    try:
        c = conn.cursor()
        c.execute(sqlCmd)
        conn.commit()
    except Error as e:
        print(e)
    finally:
        c.close()

def insertMusic(connection, link, artist, name, chords):
    command = 'INSERT INTO ' + filterGenreName(genre) + ' (name, artist, link, chords) VALUES (\'%s\', \'%s\', \'%s\', \'%s\')'%(str(name), str(artist), str(link), str(chords))
    sqlCommand(connection, command)

def saveMusicsData(musicsList, dbConnection):
    for music in musicsList:
        rawHtmlData = getData(music.link)
        parsedHtml = BeautifulSoup(rawHtmlData, 'html.parser')

        cifraDom = parsedHtml.select('.cifra_cnt')

        print('Music name: ' + music.name)
        # print(cifraDom)


        chordsDom = cifraDom[0].findAll('b')
        chords = []

        for chord in chordsDom:
            # print(chord.text)
            chords.append(chord.text)

        chords_json = json.dumps(
            chords
        )

        insertMusic(dbConnection, music.link, music.artist, music.name, chords_json)

if __name__ == '__main__':
    print('init..')

    connection = createDbConnection('database.db')

    initDb(connection)

    main()

    print(str(len(musics)) + ' musics obtained')

    saveMusicsData(musics, connection)