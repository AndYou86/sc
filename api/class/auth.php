<?php

class auth
{

    public function login(array $data = [])
    {
        if ($this->helperCheck($data)) {
            $request = new DB();

            extract($data);
            $check = $request->read('api_users', ['login' => $login]);

            if ($check && password_verify($password, $check['password'])) {
                $token = password_hash($check['password'], PASSWORD_BCRYPT, ['cost' => 11]);
                $upToken = [];
                $upToken['id'] = (int)$check['id'];
                $upToken['token'] = $token;
                if ($this->upToken($upToken)) {
                    return ['error' => false, 'token' => $token, 'id' => (int)$check['id']];
                } else {
                    return ['error' => true, 'text' => 'error db'];
                }
            } else {
                return ['error' => true, 'text' => 'error password or login'];
            }
        } else {
            return EMPTY_DATA;
        }
    }

    public function register(array $data = [])
    {
        if ($this->helperCheck($data)) {
            $request = new DB();
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 11]);
            $check = $request->create('api_users', $data);

            if ($check === '23000') {
                return ['error' => true, 'text' => 'user with this login exists'];
            } elseif (is_int($check)) {
                return ['error' => false, 'text' => 'user registered', 'id_user' => $check];
            } else {
                return ['error' => true, 'text' => 'other error'];
            }
        } else {
            return EMPTY_DATA;
        }
    }

    /**
     * @param array $data must contain key token, id 
     */
    public function logout(array $data = [])
    {
        if (array_key_exists('id', $data) && array_key_exists('token', $data)) {
            $request = new DB();
            $checkData = $data;
            $upToken = [];
            if ($checkData['token'] == false) {
                unset($checkData['token']);
                $upToken['id'] = (int)$checkData['id'];
                $upToken['token'] = NULL;
            } else {
                $check = $request->read('api_users', $checkData);
                if ($check && $data['token'] == $check['token']) {
                    $upToken['id'] = (int)$data['id'];
                    $upToken['token'] = NULL;
                }
            }

            if ($this->upToken($upToken)) {
                return ['error' => false, 'text' => 'user loguot'];
            } else {
                return ['error' => true, 'text' => 'error db'];
            }
        } else {
            return EMPTY_DATA;
        }
    }

    public function check(array $data = [])
    {
        if (array_key_exists('id', $data) && array_key_exists('token', $data)) {
            $request = new DB();
            $check = $request->read('api_users', $data);
            if ($check && $data['token'] == $check['token'] && $data['id'] == $check['id']) {
                return ['error' => false];
            } else {
                return ['error' => true];
            }
        } else {
            return EMPTY_DATA;
        }
    }

    private function helperCheck(array $data)
    {
        if (array_key_exists('login', $data) && array_key_exists('password', $data)) {
            return true;
        } else {
            return false;
        }
    }

    private function upToken(array $data = [])
    {

        $request = new DB();
        return $request->update('api_users', $data);
    }
}
