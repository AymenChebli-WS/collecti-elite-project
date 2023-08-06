<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * SurveyResponse
 *
 * @ORM\Table(name="survey_response", indexes={@ORM\Index(name="fk_resp_survey_id", columns={"survey_id"}), @ORM\Index(name="fk_resp_user_id", columns={"user_id"})})
 * @ORM\Entity
 */
class SurveyResponse
{
    /**
     * @var int
     *
     * @ORM\Column(name="reponse_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $reponseId;

    /**
     * @var \Survey
     *
     * @ORM\ManyToOne(targetEntity="Survey")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="survey_id", referencedColumnName="survey_id")
     * })
     */
    private $survey;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="user_id")
     * })
     */
    private $user;
    
    /**
     * @var string
     *
     * @ORM\Column(name="response_schema", type="text", length=0, nullable=false)
     */
    private $responseSchema;

    public function getReponseId(): ?int
    {
        return $this->reponseId;
    }

    public function getResponseSchema(): ?string
    {
        return $this->responseSchema;
    }

    public function setResponseSchema(string $responseSchema): static
    {
        $this->responseSchema = $responseSchema;

        return $this;
    }

    public function getSurvey(): ?Survey
    {
        return $this->survey;
    }

    public function setSurvey(?Survey $survey): static
    {
        $this->survey = $survey;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

}
