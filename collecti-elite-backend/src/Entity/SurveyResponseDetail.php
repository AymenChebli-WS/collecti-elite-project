<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SurveyResponseDetailRepository;

/**
 * SurveyResponseDetail
 *
 * @ORM\Table(name="survey_response_detail", indexes={@ORM\Index(name="fk_detail_quest_id", columns={"question_id"}), @ORM\Index(name="fk_detail_resp_id", columns={"response_id"})})
 * @ORM\Entity(repositoryClass=SurveyResponseDetailRepository::class)
 */
class SurveyResponseDetail
{
    /**
     * @var int
     *
     * @ORM\Column(name="detail_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $detailId;

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="text", length=65535, nullable=false)
     */
    private $answer;

    /**
     * @var \SurveyQuestion
     *
     * @ORM\ManyToOne(targetEntity="SurveyQuestion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="question_id", referencedColumnName="question_id")
     * })
     */
    private $question;

    /**
     * @var \SurveyResponse
     *
     * @ORM\ManyToOne(targetEntity="SurveyResponse")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="response_id", referencedColumnName="reponse_id")
     * })
     */
    private $response;


}
