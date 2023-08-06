<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SurveyQuestion
 *
 * @ORM\Table(name="survey_question", indexes={@ORM\Index(name="fk_survey_id", columns={"survey_id"})})
 * @ORM\Entity
 */
class SurveyQuestion
{
    /**
     * @var int
     *
     * @ORM\Column(name="question_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $questionId;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", length=65535, nullable=false)
     */
    private $text;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255, nullable=false)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="options", type="text", length=0, nullable=false)
     */
    private $options;

    /**
     * @var \Survey
     *
     * @ORM\ManyToOne(targetEntity="Survey")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="survey_id", referencedColumnName="survey_id")
     * })
     */
    private $survey;


}
