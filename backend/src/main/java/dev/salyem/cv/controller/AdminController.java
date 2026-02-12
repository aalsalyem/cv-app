package dev.salyem.cv.controller;

import dev.salyem.cv.entity.*;
import dev.salyem.cv.service.CvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "https://salyem.dev"})
public class AdminController {

    private final CvService cvService;

    // Personal Info
    @PutMapping("/personal-info")
    public ResponseEntity<PersonalInfo> updatePersonalInfo(@RequestBody PersonalInfo info) {
        return ResponseEntity.ok(cvService.updatePersonalInfo(info));
    }

    // Work Experience
    @PostMapping("/work-experience")
    public ResponseEntity<WorkExperience> createWorkExperience(@RequestBody WorkExperience experience) {
        return ResponseEntity.ok(cvService.saveWorkExperience(experience));
    }

    @PutMapping("/work-experience/{id}")
    public ResponseEntity<WorkExperience> updateWorkExperience(@PathVariable Integer id, @RequestBody WorkExperience experience) {
        experience.setId(id);
        return ResponseEntity.ok(cvService.saveWorkExperience(experience));
    }

    @DeleteMapping("/work-experience/{id}")
    public ResponseEntity<Void> deleteWorkExperience(@PathVariable Integer id) {
        cvService.deleteWorkExperience(id);
        return ResponseEntity.noContent().build();
    }

    // Education
    @PostMapping("/education")
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        return ResponseEntity.ok(cvService.saveEducation(education));
    }

    @PutMapping("/education/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Integer id, @RequestBody Education education) {
        education.setId(id);
        return ResponseEntity.ok(cvService.saveEducation(education));
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Integer id) {
        cvService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }

    // Skills
    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(cvService.saveSkill(skill));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Integer id, @RequestBody Skill skill) {
        skill.setId(id);
        return ResponseEntity.ok(cvService.saveSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Integer id) {
        cvService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // Certificates
    @PostMapping("/certificates")
    public ResponseEntity<Certificate> createCertificate(@RequestBody Certificate certificate) {
        return ResponseEntity.ok(cvService.saveCertificate(certificate));
    }

    @PutMapping("/certificates/{id}")
    public ResponseEntity<Certificate> updateCertificate(@PathVariable Integer id, @RequestBody Certificate certificate) {
        certificate.setId(id);
        return ResponseEntity.ok(cvService.saveCertificate(certificate));
    }

    @DeleteMapping("/certificates/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Integer id) {
        cvService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }

    // Languages
    @PostMapping("/languages")
    public ResponseEntity<Language> createLanguage(@RequestBody Language language) {
        return ResponseEntity.ok(cvService.saveLanguage(language));
    }

    @PutMapping("/languages/{id}")
    public ResponseEntity<Language> updateLanguage(@PathVariable Integer id, @RequestBody Language language) {
        language.setId(id);
        return ResponseEntity.ok(cvService.saveLanguage(language));
    }

    @DeleteMapping("/languages/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Integer id) {
        cvService.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }

    // Strengths
    @PostMapping("/strengths")
    public ResponseEntity<Strength> createStrength(@RequestBody Strength strength) {
        return ResponseEntity.ok(cvService.saveStrength(strength));
    }

    @PutMapping("/strengths/{id}")
    public ResponseEntity<Strength> updateStrength(@PathVariable Integer id, @RequestBody Strength strength) {
        strength.setId(id);
        return ResponseEntity.ok(cvService.saveStrength(strength));
    }

    @DeleteMapping("/strengths/{id}")
    public ResponseEntity<Void> deleteStrength(@PathVariable Integer id) {
        cvService.deleteStrength(id);
        return ResponseEntity.noContent().build();
    }
}
