### Github status:
[![nodejs](https://github.com/orc-code/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/orc-code/frontend-project-46/actions/workflows/nodejs.yml)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/orc-code/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/orc-code/frontend-project-46/actions)

### CodeCLimate maintainability and test coverage:
[![Maintainability](https://api.codeclimate.com/v1/badges/4bbdf1a4e3ca1067b590/maintainability)](https://codeclimate.com/github/orc-code/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4bbdf1a4e3ca1067b590/test_coverage)](https://codeclimate.com/github/orc-code/frontend-project-46/test_coverage)

#### Установка

1. Клонируем [репозиторий](https://github.com/orc-code/frontend-project-46.git)
```properties
git clone https://github.com/orc-code/frontend-project-46.git
```
2. Переходим в директорию проекта
```properties
cd frontend-project-46/
```
3. Устанавливаем зависимости
```properties
make install
```
4. Устанавливаем пакет приложения
```properties
make addPackage
```

### Вызов справки
``` properties
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Arguments:
  filepath1            path to first file, supported formats: json, yaml, yml
  filepath2            path to second file, supported formats: json, yaml, yml

Options:
  -V, --version        output the version number
  -f, --format [type]  output format, supported formats: plain, json, stylish (default: "stylish")
  -h, --help           display help for command
  ```

  ### Примеры использования
* плоская структура, формат stylish
```properties
gendiff __fixtures__/file1.json __fixtures__/file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

* плоская структура, формат plain
```properties
gendiff __fixtures__/file1.json __fixtures__/file2.json -f plain
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```
* плоская структура, формат json
```properties
gendiff __fixtures__/file1.yaml __fixtures__/file2.yml -f json
[
  {
    "type": "removed",
    "key": "follow",
    "value": false,
    "depth": 1
  },
  {
    "type": "default",
    "key": "host",
    "value": "hexlet.io",
    "depth": 1
  },
  {
    "type": "removed",
    "key": "proxy",
    "value": "123.234.53.22",
    "depth": 1
  },
  {
    "type": "updated",
    "key": "timeout",
    "values": [
      {
        "type": "removed",
        "key": "timeout",
        "value": 50,
        "depth": 1
      },
      {
        "type": "added",
        "key": "timeout",
        "value": 20,
        "depth": 1
      }
    ]
  },
  {
    "type": "added",
    "key": "verbose",
    "value": true,
    "depth": 1
  }
]
```

* вложенные структуры, формат stylish
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json 
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

* вложенные структуры, формат plain
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json -f plain
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

* вложенные структуры, формат json
```properties
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json -f json
[
  {
    "type": "nested",
    "key": "common",
    "value": [
      {
        "type": "added",
        "key": "follow",
        "value": false,
        "depth": 3
      },
      {
        "type": "default",
        "key": "setting1",
        "value": "Value 1",
        "depth": 3
      },
      {
        "type": "removed",
        "key": "setting2",
        "value": 200,
        "depth": 3
      },
      {
        "type": "updated",
        "key": "setting3",
        "values": [
          {
            "type": "removed",
            "key": "setting3",
            "value": true,
            "depth": 3
          },
          {
            "type": "added",
            "key": "setting3",
            "value": null,
            "depth": 3
          }
        ]
      },
      {
        "type": "added",
        "key": "setting4",
        "value": "blah blah",
        "depth": 3
      },
      {
        "type": "added",
        "key": "setting5",
        "value": [
          {
            "type": "default",
            "key": "key5",
            "value": "value5",
            "depth": 5
          }
        ],
        "depth": 3,
        "isNest": true
      },
      {
        "type": "nested",
        "key": "setting6",
        "value": [
          {
            "type": "nested",
            "key": "doge",
            "value": [
              {
                "type": "updated",
                "key": "wow",
                "values": [
                  {
                    "type": "removed",
                    "key": "wow",
                    "value": "",
                    "depth": 7
                  },
                  {
                    "type": "added",
                    "key": "wow",
                    "value": "so much",
                    "depth": 7
                  }
                ]
              }
            ],
            "depth": 5,
            "isNest": true
          },
          {
            "type": "default",
            "key": "key",
            "value": "value",
            "depth": 5
          },
          {
            "type": "added",
            "key": "ops",
            "value": "vops",
            "depth": 5
          }
        ],
        "depth": 3,
        "isNest": true
      }
    ],
    "depth": 1,
    "isNest": true
  },
  {
    "type": "nested",
    "key": "group1",
    "value": [
      {
        "type": "updated",
        "key": "baz",
        "values": [
          {
            "type": "removed",
            "key": "baz",
            "value": "bas",
            "depth": 3
          },
          {
            "type": "added",
            "key": "baz",
            "value": "bars",
            "depth": 3
          }
        ]
      },
      {
        "type": "default",
        "key": "foo",
        "value": "bar",
        "depth": 3
      },
      {
        "type": "updated",
        "key": "nest",
        "values": [
          {
            "type": "removed",
            "key": "nest",
            "value": [
              {
                "type": "default",
                "key": "key",
                "value": "value",
                "depth": 5
              }
            ],
            "depth": 3,
            "isNest": true
          },
          {
            "type": "added",
            "key": "nest",
            "value": "str",
            "depth": 3
          }
        ]
      }
    ],
    "depth": 1,
    "isNest": true
  },
  {
    "type": "removed",
    "key": "group2",
    "value": [
      {
        "type": "default",
        "key": "abc",
        "value": 12345,
        "depth": 3
      },
      {
        "type": "nested",
        "key": "deep",
        "value": [
          {
            "type": "default",
            "key": "id",
            "value": 45,
            "depth": 5
          }
        ],
        "depth": 3,
        "isNest": true
      }
    ],
    "depth": 1,
    "isNest": true
  },
  {
    "type": "added",
    "key": "group3",
    "value": [
      {
        "type": "nested",
        "key": "deep",
        "value": [
          {
            "type": "nested",
            "key": "id",
            "value": [
              {
                "type": "default",
                "key": "number",
                "value": 45,
                "depth": 7
              }
            ],
            "depth": 5,
            "isNest": true
          }
        ],
        "depth": 3,
        "isNest": true
      },
      {
        "type": "default",
        "key": "fee",
        "value": 100500,
        "depth": 3
      }
    ],
    "depth": 1,
    "isNest": true
  }
]
```
