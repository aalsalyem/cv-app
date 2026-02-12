package dev.salyem.cv.dto;

import dev.salyem.cv.entity.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CvDto {
    private PersonalInfo personalInfo;
    private List<WorkExperience> workExperience;
    private List<Education> education;
    private List<Skill> skills;
    private List<Certificate> certificates;
    private List<Language> languages;
    private List<Strength> strengths;
}
