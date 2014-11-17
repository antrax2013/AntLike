<?php
class LikeVM
{
    public $userLike=false;
    public $nbLikes=0;

    public function __construct($a_userLike, $a_nbLikes)
    {
        $this->userLike = $a_userLike;
        $this->nbLikes = $a_nbLikes;
    }
}
?>
