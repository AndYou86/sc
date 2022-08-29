<?php

class students
{

    public function getStudents(int $page = 0, int $limit = 5)
    {
        $request = new DB();
        if ($page > 1) {
            $offset = $limit * ($page - 1);
        } else {
            $offset = 0;
        }
        $check = $request->read('students', [], $limit, $offset);
        $data = [];
        if (empty($check)) {
            $data['count'] = 0;
        } else {
            $data['count'] = $this->count();
            $data['students'] = $check;
        }
        return $data;
    }

    private function count()
    {
        $request = new DB();
        $count = $request->count('students');
        return $count['count'];
    }
}
