package dev.salyem.cv.service;

import dev.salyem.cv.dto.CvDto;
import dev.salyem.cv.entity.*;
import dev.salyem.cv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CvService {

    private final PersonalInfoRepository personalInfoRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final CertificateRepository certificateRepository;
    private final LanguageRepository languageRepository;
    private final StrengthRepository strengthRepository;

    @Transactional(readOnly = true)
    public CvDto getFullCv() {
        PersonalInfo personalInfo = personalInfoRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        return CvDto.builder()
                .personalInfo(personalInfo)
                .workExperience(workExperienceRepository.findAllByOrderBySortOrderAsc())
                .education(educationRepository.findAllByOrderBySortOrderAsc())
                .skills(skillRepository.findAllByOrderBySortOrderAsc())
                .certificates(certificateRepository.findAllByOrderBySortOrderAsc())
                .languages(languageRepository.findAllByOrderBySortOrderAsc())
                .strengths(strengthRepository.findAllByOrderBySortOrderAsc())
                .build();
    }

    @Transactional
    public PersonalInfo updatePersonalInfo(PersonalInfo info) {
        PersonalInfo existing = personalInfoRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Personal info not found"));

        existing.setName(info.getName());
        existing.setEmail(info.getEmail());
        existing.setPhone(info.getPhone());
        existing.setLocation(info.getLocation());
        existing.setLinkedinUrl(info.getLinkedinUrl());
        existing.setPhotoUrl(info.getPhotoUrl());
        existing.setObjective(info.getObjective());

        return personalInfoRepository.save(existing);
    }

    @Transactional
    public WorkExperience saveWorkExperience(WorkExperience experience) {
        return workExperienceRepository.save(experience);
    }

    @Transactional
    public void deleteWorkExperience(Integer id) {
        workExperienceRepository.deleteById(id);
    }

    @Transactional
    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    @Transactional
    public void deleteEducation(Integer id) {
        educationRepository.deleteById(id);
    }

    @Transactional
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Transactional
    public void deleteSkill(Integer id) {
        skillRepository.deleteById(id);
    }

    @Transactional
    public Certificate saveCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @Transactional
    public void deleteCertificate(Integer id) {
        certificateRepository.deleteById(id);
    }

    @Transactional
    public Language saveLanguage(Language language) {
        return languageRepository.save(language);
    }

    @Transactional
    public void deleteLanguage(Integer id) {
        languageRepository.deleteById(id);
    }

    @Transactional
    public Strength saveStrength(Strength strength) {
        return strengthRepository.save(strength);
    }

    @Transactional
    public void deleteStrength(Integer id) {
        strengthRepository.deleteById(id);
    }
}
