<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SurveyRepository;

/**
 * Survey
 *
 * @ORM\Table(name="survey", indexes={@ORM\Index(name="fk_user_id", columns={"user_id"})})
 * @ORM\Entity(repositoryClass=SurveyRepository::class)
 */
class Survey
{
    /**
     * @var int
     *
     * @ORM\Column(name="survey_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $surveyId;

    /**
     * @var string
     *
     * @ORM\Column(name="`schema`", type="text", length=0, nullable=false)
     */
    private $schema;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, options={"default"="current_timestamp()"})
     */
    private $createdAt = 'current_timestamp()';

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="user_id")
     * })
     */
    private $user;

    public function getSurveyId(): ?int
    {
        return $this->surveyId;
    }

    public function getSchema(): ?string
    {
        return $this->schema;
    }

    public function setSchema(string $schema): static
    {
        $this->schema = $schema;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

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
