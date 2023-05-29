/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.swp391.backend.controllers.user;

import com.swp391.backend.controllers.authentication.AuthenticatedManager;
import com.swp391.backend.model.receiveinfo.ReceiveInfo;
import com.swp391.backend.model.receiveinfo.ReceiveInfoService;
import com.swp391.backend.model.user.User;
import com.swp391.backend.model.user.UserDTO;
import com.swp391.backend.model.user.UserService;
import com.swp391.backend.utils.storage.StorageService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Lenovo
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserDetailController {

    private final UserService userService;
    private final AuthenticatedManager authenticatedManager;
    private final PasswordEncoder passwordEncoder;
    private final StorageService storageService;
    private final ReceiveInfoService receiveInfoService;

//    @GetMapping("/{email}")
//    @PreAuthorize("#email == authentication.principal.username")
//    public UserDetails get(@PathVariable("email") String email) {
//        return userService.loadUserByUsername(email);
//    }
    @GetMapping("/info")
    public ResponseEntity<UserDTO> loginUserInfo() {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        int page = receiveInfoService.getMaxPage(user);
        UserDTO userDTO = UserDTO.builder()
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .imageurl(user.getImageurl())
                .gender(user.getGender())
                .receiveInfoPage(page)
                .build();
        return ResponseEntity.ok().body(userDTO);
    }

    @Transactional
    @PostMapping("/info/update/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request) {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setGender(request.getGender());
        userService.save(user);
        return ResponseEntity.ok("Update profile successfully!");
    }

    @Transactional
    @PostMapping("/info/update/password")
    public ResponseEntity<String> updatePassword(@RequestBody ChangePasswordRequest request) {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        String old_password = request.getOldpassword();
        String new_password = request.getNewpassword();
        boolean isMatch = passwordEncoder.matches(old_password, user.getPassword());
        if (!isMatch) {
            throw new IllegalStateException("Old Password is incorrect!");
        }
        user.setPassword(passwordEncoder.encode(new_password));
        userService.save(user);
        return ResponseEntity.ok("Change password successfully!");
    }

    @PostMapping("/info/avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        user.setImageurl("/api/v1/users/info/avatar");
        userService.save(user);
        storageService.store(file, user.getId() + ".avatar");
        return ResponseEntity.ok("Ok");
    }

    @GetMapping("/info/avatar")
    public ResponseEntity<Resource> getAvatar() {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        String avatarFile = user.getId() + ".avatar";
        Resource file = storageService.loadAsResource(avatarFile);
        HttpHeaders header = new HttpHeaders();
        header.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"");
        header.set(HttpHeaders.CONTENT_TYPE, "image/jpeg");
        return ResponseEntity.ok().headers(header).body(file);
    }

    @PostMapping("/info/receives")
    public ResponseEntity<ReceiveInfo> addReceiveInfo(@RequestBody ReceiveInfoRequest request) {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        boolean defaultInfo = request.is_default();
        if (receiveInfoService.getReceiveInfo(user, 0).size() == 0) {
            defaultInfo = true;
        }

        var receiveInfo = ReceiveInfo.builder()
                .fullname(request.getFullname())
                .phone(request.getPhone())
                .province(request.getProvince())
                .district(request.getDistrict())
                .ward(request.getWard())
                .specific_address(request.getSpecific_address())
                ._default(defaultInfo)
                .user(user)
                .build();
        return ResponseEntity.ok().body(receiveInfoService.saveReceiveInfo(receiveInfo));
    }

    @GetMapping("/info/receives")
    public ResponseEntity<List<ReceiveInfo>> getReceiveInfo(@RequestParam("page") Integer pageNum) {
        pageNum--;
        User user = (User) authenticatedManager.getAuthenticatedUser();
        return ResponseEntity.ok().body(receiveInfoService.getReceiveInfo(user, pageNum));
    }

    @PostMapping("/info/receives/default/{receive_id}")
    public ResponseEntity<ReceiveInfo> setReceiveInfoDefault(@PathVariable("receive_id") Integer id) {
        User user = (User) authenticatedManager.getAuthenticatedUser();
        ReceiveInfo info = receiveInfoService.getReceiveInfo(id);
        info.set_default(true);
        List<ReceiveInfo> infos = receiveInfoService.getReceiveInfo(user).stream()
                .filter(r -> r.getId() != id)
                .map(r -> {
                    r.set_default(false);
                    return r;
                }).collect(Collectors.toList());
        receiveInfoService.saveReceiveInfo(info);
        receiveInfoService.saveReceiveInfos(infos);
        return ResponseEntity.ok().body(info);
    }

    @DeleteMapping("/info/receives/delete/{delete_id}")
    public ResponseEntity<String> deleteReceiveInfo(@PathVariable("delete_id") Integer id) {
        receiveInfoService.deleteReceiveInfo(id);
        return ResponseEntity.ok().build();
    }
}
