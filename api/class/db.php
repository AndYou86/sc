<?php

class DB
{

    private $db = false;

    public function __construct(array $config = [])
    {
        if (empty($config) && !defined('DB_DATA')) {
            return false;
        }

        if (empty($config) && defined('DB_DATA')) {
            $config = DB_DATA;
        }

        $dsn = "mysql:host=" . $config['server'] . ";dbname=" . $config['dbname'] . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        try {
            $this->db = new PDO($dsn, $config['username'], $config['password'], $options);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            exit('error db');
        }
    }

    // create
    public function create(string $nameTable = '', array $body = [])
    {

        if ($this->db && !empty($nameTable) && $body) {
            // prepare variables, it's more convenient for me
            $pdo = $this->db;
            $nameColumn = array_keys($body);
            $columnVal = '';
            $nameColumn = implode(", ", $nameColumn);
            $val = array_values($body);
            for ($i = 0; $i <= count($val) - 1; $i++) {
                if ($i == count($body) - 1) {
                    $v = '?';
                } else {
                    $v = '?,';
                }
                $columnVal .= $v;
            }

            try {
                $stmt = $pdo->prepare("INSERT INTO $nameTable ($nameColumn) VALUES ($columnVal);");
                $stmt->execute($val);
                $id = $pdo->lastInsertId();
                $stmt = null;
                return (int)$id;
            } catch (PDOException $e) {
                return $e->getCode();
            }
        } else {
            return false;
        }
    }
    // read
    public function read(string $nameTable = '', array $body = [], int $count = 0, int $offset = 0)
    {
        if ($this->db && !empty($nameTable)) {
            $pdo = $this->db;
            $sql = "SELECT * FROM $nameTable";


            if (!empty($body) && count($body) == 1) {
                $key = array_key_first($body);
                if ($offset > 0) {
                    $sql .= " WHERE $key=:$key AND `id` > $offset";
                } else {
                    $sql .= " WHERE $key=:$key";
                }
            } elseif (!empty($body) && count($body) > 1) {
                $sql .= " WHERE ";
                $i = 1;
                $countBody = count($body);
                while (current($body)) {
                    if ($i != $countBody) {
                        $sql .= key($body) . "=:" . key($body) . " AND ";
                    } else {
                        $sql .= key($body) . "=:" . key($body) . " ";
                    }
                    $i++;
                    next($body);
                }
                if ($offset > 0) {
                    $sql .= " AND `id` > $offset ";
                }
            }

            if (empty($body) && $offset > 0) {
                $sql .= " WHERE `id` > $offset ";
            }

            if ($count != 0) {
                $sql .= " ORDER BY id ASC LIMIT $count";
            } else {
                $sql .= " ORDER BY id ASC";
            }
            $sql .= ";";

            if (empty($body)) {
                $data = $pdo->query($sql)->fetchAll();
            } else {

                $stmt = $pdo->prepare($sql);
                $stmt->execute($body);
                $data = $stmt->fetch();
            }

            return $data;
        } else {
            return false;
        }
    }
    //update
    public function update(string $nameTable = '', array $body = [])
    {
        if ($this->db && !empty($nameTable) && !empty($body['id'])) {
            $pdo = $this->db;
            $sql = "UPDATE $nameTable SET";
            $id = $body['id'];
            unset($body['id']);

            $nameColumn = array_keys($body);
            $vals = array_values($body);

            for ($i = 0; $i <= count($nameColumn) - 1; $i++) {
                if ($i == count($nameColumn) - 1) {
                    $sql .= " $nameColumn[$i] = ? ";
                } else {
                    $sql .= " $nameColumn[$i] = ?,";
                }
            }
            $sql .= "WHERE `id`= $id;";


            try {
                $stmt = $pdo->prepare($sql);
                $stmt->execute($vals);
                $stmt = null;

                return true;
            } catch (PDOException $e) {
                return $e->getCode();
            }
        } else {
            return false;
        }
    }

    public function count(string $nameTable = '')
    {
        if ($this->db && !empty($nameTable)) {
            $pdo = $this->db;
            $sql = "SELECT count(*) as count FROM $nameTable;";
            try {
                $stmt = $pdo->query($sql);
                $data = $stmt->fetch();
                $stmt = null;
                return $data;
            } catch (PDOException $e) {
                return $e->getCode();
            }
        } else {
            return false;
        }
    }
}
